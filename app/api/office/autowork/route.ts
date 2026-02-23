import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';
import { spawn } from 'child_process';

const STATUS_DIR = join(homedir(), '.openclaw', '.status');
const AUTOWORK_FILE = join(STATUS_DIR, 'autowork.json');

const DEFAULT_PROMPT =
  'Auto-work check-in. Continue any in-progress tasks, or find and start your highest priority task based on your role and current assignments. If truly idle with nothing to do, briefly report your status.';

interface AutoworkPolicy {
  enabled: boolean;
  intervalMs: number;
  prompt: string;
  lastSentAt: number;
}

function findOpenclawBin(): string {
  const { execSync } = require('child_process');
  try {
    return execSync('which openclaw', { encoding: 'utf-8' }).trim();
  } catch {}
  const candidates = [
    join(homedir(), '.local/node/bin/openclaw'),
    join(homedir(), '.local/bin/openclaw'),
    '/usr/local/bin/openclaw',
  ];
  for (const p of candidates) {
    if (existsSync(p)) return p;
  }
  return 'openclaw';
}

const OPENCLAW_BIN = findOpenclawBin();

function readPolicies(): Record<string, AutoworkPolicy> {
  try {
    if (existsSync(AUTOWORK_FILE)) {
      return JSON.parse(readFileSync(AUTOWORK_FILE, 'utf-8'));
    }
  } catch {}
  return {};
}

function writePolicies(policies: Record<string, AutoworkPolicy>): void {
  if (!existsSync(STATUS_DIR)) mkdirSync(STATUS_DIR, { recursive: true });
  writeFileSync(AUTOWORK_FILE, JSON.stringify(policies, null, 2));
}

function sendToAgent(agentId: string, message: string): void {
  const proc = spawn(OPENCLAW_BIN, ['agent', '--agent', agentId, '--message', message], {
    env: process.env,
    detached: true,
    stdio: 'ignore',
  });
  proc.unref();
}

/**
 * GET — return all auto-work policies
 */
export async function GET() {
  return NextResponse.json(readPolicies());
}

/**
 * POST — create or update an agent's auto-work policy
 * Body: { agentId, enabled?, intervalMs?, prompt? }
 */
export async function POST(request: Request) {
  try {
    const { agentId, enabled, intervalMs, prompt } = await request.json();

    if (!agentId || typeof agentId !== 'string') {
      return NextResponse.json({ error: 'agentId required' }, { status: 400 });
    }

    const policies = readPolicies();
    const existing = policies[agentId] || {
      enabled: false,
      intervalMs: 600_000,
      prompt: DEFAULT_PROMPT,
      lastSentAt: 0,
    };

    if (typeof enabled === 'boolean') existing.enabled = enabled;
    if (typeof intervalMs === 'number' && intervalMs >= 60_000) existing.intervalMs = intervalMs;
    if (typeof prompt === 'string') existing.prompt = prompt || DEFAULT_PROMPT;

    policies[agentId] = existing;
    writePolicies(policies);

    return NextResponse.json({ success: true, policy: existing });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to update' }, { status: 500 });
  }
}

/**
 * PUT — tick: check all enabled policies and send work where interval has elapsed.
 * Optionally pass { agentId } to force-send to one agent immediately.
 */
export async function PUT(request: Request) {
  try {
    let forceAgent: string | undefined;
    try {
      const body = await request.json();
      forceAgent = body?.agentId;
    } catch {}

    const policies = readPolicies();
    const now = Date.now();
    const sent: string[] = [];

    for (const [agentId, policy] of Object.entries(policies)) {
      if (!policy.enabled && agentId !== forceAgent) continue;

      const elapsed = now - (policy.lastSentAt || 0);
      const shouldSend = agentId === forceAgent || elapsed >= policy.intervalMs;

      if (shouldSend) {
        sendToAgent(agentId, policy.prompt || DEFAULT_PROMPT);
        policy.lastSentAt = now;
        sent.push(agentId);
      }
    }

    // Handle force-send for an agent that has no policy yet
    if (forceAgent && !policies[forceAgent]) {
      policies[forceAgent] = {
        enabled: false,
        intervalMs: 600_000,
        prompt: DEFAULT_PROMPT,
        lastSentAt: now,
      };
      sendToAgent(forceAgent, DEFAULT_PROMPT);
      sent.push(forceAgent);
    }

    if (sent.length > 0) writePolicies(policies);

    return NextResponse.json({ sent, tick: now });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Tick failed' }, { status: 500 });
  }
}
