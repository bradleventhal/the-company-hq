import { NextResponse } from 'next/server';
import { readFileSync, existsSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';

const STATUS_DIR = join(homedir(), '.openclaw', '.status');
const CHAT_FILE = join(STATUS_DIR, 'chat.json');
const ACCOMPLISHMENTS_FILE = join(STATUS_DIR, 'accomplishments.json');
const CONFIG_PATHS = [
  join(process.cwd(), 'openclawfice.config.json'),
  join(homedir(), '.openclaw', 'openclawfice.config.json'),
];

function ensureStatusDir() {
  try {
    if (!existsSync(STATUS_DIR)) mkdirSync(STATUS_DIR, { recursive: true });
  } catch {}
}

function readChat(): any[] {
  try {
    if (existsSync(CHAT_FILE)) {
      return JSON.parse(readFileSync(CHAT_FILE, 'utf-8'));
    }
  } catch {}
  return [];
}

function readOfficeConfig(): any {
  for (const path of CONFIG_PATHS) {
    if (existsSync(path)) {
      try {
        return JSON.parse(readFileSync(path, 'utf-8'));
      } catch {}
    }
  }
  return {};
}

function readAccomplishments(): any[] {
  try {
    if (existsSync(ACCOMPLISHMENTS_FILE)) {
      return JSON.parse(readFileSync(ACCOMPLISHMENTS_FILE, 'utf-8'));
    }
  } catch {}
  return [];
}

interface AgentContext {
  task?: string;
  status?: string;
  lastAccomplishment?: { title: string; detail?: string; timestamp: number };
}

interface ChatInput {
  agentNames: string[];
  allAgents: { name: string; status: string; task?: string }[];
  contexts: Record<string, AgentContext>;
  recentChat: { from: string; text: string }[];
}

const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
const pickFrom = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

/**
 * Build substantive chat messages from real data. Every message should
 * reference something concrete — a task, an accomplishment, a priority,
 * a specific teammate's work, or a real question.
 */
function generateChatMessage(
  input: ChatInput,
  mission?: { goal?: string; priorities?: string[] },
): { from: string; text: string; ts: number } | null {
  const { agentNames, allAgents, contexts, recentChat } = input;
  if (agentNames.length === 0) return null;

  const from = pick(agentNames);
  const ctx = contexts[from] || {};
  const recentTexts = new Set(recentChat.slice(-8).map(m => m.text));

  const pool: string[] = [];

  // ── Reference own current task ──────────────────────────────────────
  if (ctx.task) {
    pool.push(
      `Update on ${ctx.task} — making progress, should have something to show soon`,
      `Heads up: ${ctx.task} is taking longer than expected. Might need to simplify scope`,
      `Just wrapped a chunk of ${ctx.task}. Moving to the next piece`,
      `Question for the team: anyone dealt with something similar to ${ctx.task} before?`,
      `${ctx.task} — hit a tricky part but I think I see the path forward`,
    );
  }

  // ── Reference own recent accomplishment ─────────────────────────────
  if (ctx.lastAccomplishment) {
    const a = ctx.lastAccomplishment;
    const minsAgo = Math.floor((Date.now() - a.timestamp) / 60000);
    if (minsAgo < 120) {
      pool.push(
        `Just finished: ${a.title}. What should I pick up next?`,
        `Done with ${a.title}. Let me know if anyone needs a hand before I grab the next thing`,
        `Shipped ${a.title} — ${a.detail || 'ready for review'}`,
      );
    }
  }

  // ── Reference teammates' actual work ────────────────────────────────
  const teammates = allAgents.filter(a => a.name !== from);
  for (const t of teammates) {
    const tCtx = contexts[t.name];
    if (t.task && t.status === 'working') {
      pool.push(
        `${t.name}, how's ${t.task} going? Need anything from me?`,
        `Looks like ${t.name} is deep into ${t.task} — let me know if I can help unblock`,
      );
    }
    if (tCtx?.lastAccomplishment) {
      const ta = tCtx.lastAccomplishment;
      const minsAgo = Math.floor((Date.now() - ta.timestamp) / 60000);
      if (minsAgo < 180) {
        pool.push(
          `Nice one ${t.name} on ${ta.title} — does that change anything for the rest of us?`,
          `Saw ${t.name} finished ${ta.title}. Should we build on that or move to something else?`,
        );
      }
    }
  }

  // ── Mission-aware: reference specific priorities ────────────────────
  if (mission?.priorities?.length) {
    const p = pick(mission.priorities);
    const others = mission.priorities.filter(x => x !== p);
    pool.push(
      `Re: "${p}" — I think I can make a dent on this. Anyone already started?`,
      `Should we prioritize "${p}" or are we blocked on something else first?`,
      `"${p}" feels like it needs attention. I can take a crack at it if nobody else is on it`,
    );
    if (others.length > 0) {
      const other = pick(others);
      pool.push(
        `Are we further along on "${p}" or "${other}"? Want to make sure I'm not duplicating effort`,
      );
    }
  }

  if (mission?.goal) {
    pool.push(
      `Thinking about the big picture — ${mission.goal}. What's the biggest gap right now?`,
      `Where are we most behind on "${mission.goal}"? I want to focus where it matters`,
    );
  }

  // ── Cross-functional observations ───────────────────────────────────
  const working = allAgents.filter(a => a.status === 'working');
  const idle = allAgents.filter(a => a.status === 'idle' && a.name !== from);

  if (working.length === 0 && allAgents.length > 1) {
    pool.push(
      `Looks like everyone's idle — should we do a quick sync on what to tackle next?`,
      `Nobody's got an active task. What's the highest impact thing we should jump on?`,
    );
  }

  if (idle.length > 0 && working.length > 0) {
    const idleName = pick(idle.map(a => a.name));
    const workingAgent = pickFrom(working);
    if (workingAgent.task) {
      pool.push(
        `${idleName}, could you help ${workingAgent.name} with ${workingAgent.task}? Looks like they could use support`,
      );
    }
  }

  // ── Remove anything that was said recently ──────────────────────────
  const fresh = pool.filter(m => !recentTexts.has(m));
  const finalPool = fresh.length > 0 ? fresh : pool;

  if (finalPool.length === 0) return null;

  return {
    from,
    text: pick(finalPool),
    ts: Date.now(),
  };
}

export async function GET() {
  return NextResponse.json(readChat());
}

export async function POST(request: Request) {
  ensureStatusDir();

  try {
    const body = await request.json();
    const config = readOfficeConfig();
    const waterCoolerConfig = config.waterCooler || {};

    if (waterCoolerConfig.enabled === false) {
      return NextResponse.json({ success: false, error: 'Water cooler disabled' });
    }

    const chat = readChat();
    const agentNames: string[] = body.agentNames || [];
    const rawContexts: Record<string, { task?: string; status?: string }> = body.contexts || {};
    const allAgents: { name: string; status: string; task?: string }[] = body.allAgents || [];

    // Enrich contexts with recent accomplishments
    const accomplishments = readAccomplishments();
    const enriched: Record<string, AgentContext> = {};
    for (const [name, ctx] of Object.entries(rawContexts)) {
      const agentAccs = accomplishments
        .filter(a => a.who === name)
        .sort((a: any, b: any) => (b.timestamp || 0) - (a.timestamp || 0));
      enriched[name] = {
        ...ctx,
        lastAccomplishment: agentAccs[0]
          ? { title: agentAccs[0].title, detail: agentAccs[0].detail, timestamp: agentAccs[0].timestamp }
          : undefined,
      };
    }

    const newMessage = generateChatMessage(
      {
        agentNames,
        allAgents,
        contexts: enriched,
        recentChat: chat.slice(-10),
      },
      config.mission,
    );

    if (newMessage) {
      chat.push(newMessage);
      const maxMessages = waterCoolerConfig.maxMessages || 50;
      const trimmed = chat.slice(-maxMessages);
      writeFileSync(CHAT_FILE, JSON.stringify(trimmed, null, 2));
      return NextResponse.json({ success: true, message: newMessage });
    }

    return NextResponse.json({ success: false, error: 'No agents available' });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to generate chat' }, { status: 500 });
  }
}
