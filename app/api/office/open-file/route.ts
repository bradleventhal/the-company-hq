import { NextResponse } from 'next/server';
import { readFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join, basename } from 'path';
import { homedir } from 'os';
import { exec } from 'child_process';

const OPENCLAW_DIR = join(homedir(), '.openclaw');
const OPENCLAW_CONFIG = join(OPENCLAW_DIR, 'openclaw.json');

function getAgentWorkspaces(): string[] {
  try {
    if (!existsSync(OPENCLAW_CONFIG)) return [];
    const config = JSON.parse(readFileSync(OPENCLAW_CONFIG, 'utf-8'));
    const agentsList: any[] = config.agents?.list || [];
    const defaultWorkspace = config.agents?.defaults?.workspace || '';
    const workspaces = new Set<string>();
    for (const agent of agentsList) {
      const ws = agent.workspace || defaultWorkspace;
      if (ws) workspaces.add(ws);
    }
    return Array.from(workspaces);
  } catch {
    return [];
  }
}

const SKIP_DIRS = new Set(['node_modules', '.next', '.git', 'dist', 'build', '.turbo', '.vercel']);

function findFileInDir(dir: string, filename: string, maxDepth = 6): string | null {
  if (maxDepth <= 0) return null;
  try {
    const entries = readdirSync(dir);
    for (const entry of entries) {
      if (entry.startsWith('.') || SKIP_DIRS.has(entry)) continue;
      const full = join(dir, entry);
      try {
        const stat = statSync(full);
        if (stat.isFile() && entry === filename) return full;
        if (stat.isDirectory() && maxDepth > 1) {
          const found = findFileInDir(full, filename, maxDepth - 1);
          if (found) return found;
        }
      } catch { continue; }
    }
  } catch {}
  return null;
}

function findFile(filename: string): string | null {
  const workspaces = getAgentWorkspaces();

  for (const ws of workspaces) {
    if (!existsSync(ws)) continue;
    const direct = join(ws, filename);
    if (existsSync(direct)) return direct;
  }

  for (const ws of workspaces) {
    if (!existsSync(ws)) continue;
    const found = findFileInDir(ws, filename);
    if (found) return found;
  }

  const home = homedir();
  const homeFile = join(home, filename);
  if (existsSync(homeFile)) return homeFile;
  return null;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const filename = url.searchParams.get('name');

  if (!filename) {
    return NextResponse.json({ error: 'Missing name parameter' }, { status: 400 });
  }

  const resolved = findFile(filename);
  if (!resolved) {
    return NextResponse.json({ error: 'File not found', searched: getAgentWorkspaces() }, { status: 404 });
  }

  return NextResponse.json({ path: resolved, filename: basename(resolved) });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const filename = body.name;
    if (!filename) {
      return NextResponse.json({ error: 'Missing name' }, { status: 400 });
    }

    const resolved = findFile(filename);
    if (!resolved) {
      return NextResponse.json({ error: 'File not found', searched: getAgentWorkspaces() }, { status: 404 });
    }

    const editors = ['cursor', 'code'];
    let opened = false;
    for (const editor of editors) {
      try {
        await new Promise<void>((resolve, reject) => {
          exec(`${editor} "${resolved}"`, { timeout: 5000 }, (err) => {
            if (err) reject(err); else resolve();
          });
        });
        opened = true;
        break;
      } catch { continue; }
    }

    if (!opened) {
      exec(`open "${resolved}"`, { timeout: 5000 });
    }

    return NextResponse.json({ path: resolved, opened: true });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to open file' }, { status: 500 });
  }
}
