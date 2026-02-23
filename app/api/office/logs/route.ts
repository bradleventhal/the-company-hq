import { NextResponse } from 'next/server';
import { readFileSync, existsSync, openSync, fstatSync, readSync, closeSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';

const AGENTS_DIR = join(homedir(), '.openclaw', 'agents');

interface LogEntry {
  ts: string;
  role: 'user' | 'assistant' | 'tool';
  type: 'text' | 'tool_use' | 'tool_result' | 'watercooler';
  summary: string;
}

function readTailLines(filePath: string, maxLines: number): string[] {
  try {
    const fd = openSync(filePath, 'r');
    const stat = fstatSync(fd);
    const chunkSize = Math.min(stat.size, 256 * 1024);
    const buf = Buffer.alloc(chunkSize);
    readSync(fd, buf, 0, chunkSize, stat.size - chunkSize);
    closeSync(fd);
    return buf.toString('utf-8').split('\n').filter(l => l.trim());
  } catch {
    return [];
  }
}

function extractTextSummary(text: string, maxLen = 120): string {
  const cleaned = text
    .replace(/^\[.*?\]\s*/, '')
    .replace(/```[\s\S]*?```/g, '[code block]')
    .replace(/\n+/g, ' ')
    .trim();
  if (cleaned.length <= maxLen) return cleaned;
  return cleaned.slice(0, maxLen - 3) + '...';
}

function parseTranscriptEntries(lines: string[]): LogEntry[] {
  const entries: LogEntry[] = [];

  for (const line of lines) {
    try {
      const raw = JSON.parse(line);
      const entry = raw.type === 'message' ? raw : { message: raw, timestamp: raw.timestamp };
      const msg = entry.message;
      if (!msg?.role) continue;

      const ts = entry.timestamp || raw.timestamp || '';

      if (msg.role === 'assistant') {
        const parts = Array.isArray(msg.content) ? msg.content : [];

        for (const part of parts) {
          if (part.type === 'text' && part.text?.trim()) {
            const text = part.text.trim();
            if (text.includes('HEARTBEAT') || text === 'NO_REPLY' || text.length < 3) continue;
            entries.push({ ts, role: 'assistant', type: 'text', summary: extractTextSummary(text) });
          } else if (part.type === 'tool_use') {
            const name = part.name || 'unknown_tool';
            let detail = '';
            if (part.input) {
              if (name === 'Read' || name === 'read_file') {
                detail = part.input.path || part.input.file_path || '';
              } else if (name === 'Write' || name === 'write_to_file' || name === 'StrReplace' || name === 'str_replace_editor') {
                detail = part.input.path || part.input.file_path || '';
              } else if (name === 'Shell' || name === 'execute_command' || name === 'Bash') {
                detail = extractTextSummary(part.input.command || part.input.cmd || '', 80);
              } else if (name === 'Grep' || name === 'Search' || name === 'search_files') {
                detail = part.input.pattern || part.input.query || part.input.regex || '';
              }
            }
            entries.push({
              ts, role: 'assistant', type: 'tool_use',
              summary: detail ? `${name}: ${detail}` : name,
            });
          }
        }
      } else if (msg.role === 'user') {
        const c = msg.content;
        const text = typeof c === 'string' ? c
          : Array.isArray(c) ? (c.find((x: any) => x.type === 'text')?.text || '') : '';
        if (!text || text.includes('HEARTBEAT') || text.includes('Read HEARTBEAT.md')
            || text.includes('Pre-compaction memory flush') || text.length < 5
            || text.includes('Agent-to-agent announce step')) continue;
        const isWatercooler = text.includes('WATER COOLER CHAT');
        entries.push({ ts, role: 'user', type: isWatercooler ? 'watercooler' : 'text', summary: isWatercooler ? '💬 Water cooler prompt' : extractTextSummary(text) });
      } else if (msg.role === 'tool') {
        // Summarize tool results very briefly
        const c = msg.content;
        const text = typeof c === 'string' ? c
          : Array.isArray(c) ? (c.find((x: any) => x.type === 'text')?.text || '') : '';
        if (text) {
          const isError = text.toLowerCase().includes('error') || text.toLowerCase().includes('failed');
          entries.push({
            ts, role: 'tool', type: 'tool_result',
            summary: isError ? `⚠️ ${extractTextSummary(text, 80)}` : `✓ result (${text.length} chars)`,
          });
        }
      }
    } catch {}
  }

  return entries;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const agentId = searchParams.get('agentId');
  const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 200);

  if (!agentId) {
    return NextResponse.json({ error: 'agentId required' }, { status: 400 });
  }

  const agentDirId = agentId === '_owner' ? 'main' : agentId;
  const sessionsFile = join(AGENTS_DIR, agentDirId, 'sessions', 'sessions.json');

  if (!existsSync(sessionsFile)) {
    return NextResponse.json({ entries: [], sessions: [] });
  }

  let sessions: Record<string, any> = {};
  try {
    sessions = JSON.parse(readFileSync(sessionsFile, 'utf-8'));
  } catch {
    return NextResponse.json({ entries: [], sessions: [] });
  }

  // Find the most recent non-watercooler session
  let targetKey = '';
  let targetSession: any = null;
  for (const [key, session] of Object.entries(sessions) as [string, any][]) {
    if (key.includes(':watercooler')) continue;
    if (!targetSession || session.updatedAt > targetSession.updatedAt) {
      targetSession = session;
      targetKey = key;
    }
  }

  if (!targetSession) {
    return NextResponse.json({ entries: [], sessions: [] });
  }

  const transcriptPath = join(AGENTS_DIR, agentDirId, 'sessions', `${targetSession.sessionId}.jsonl`);
  const lines = readTailLines(transcriptPath, limit * 3);
  const entries = parseTranscriptEntries(lines).slice(-limit);

  // Build session list summary
  const sessionList = Object.entries(sessions)
    .filter(([k]) => !k.includes(':watercooler'))
    .map(([key, s]: [string, any]) => ({
      key,
      sessionId: s.sessionId,
      updatedAt: s.updatedAt,
      active: key === targetKey,
    }))
    .sort((a, b) => b.updatedAt - a.updatedAt)
    .slice(0, 5);

  return NextResponse.json({
    entries,
    activeSession: {
      key: targetKey,
      sessionId: targetSession.sessionId,
      updatedAt: targetSession.updatedAt,
    },
    sessions: sessionList,
  });
}
