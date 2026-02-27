import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

/**
 * GET /api/analytics/onboarding
 * 
 * Shows the onboarding funnel: where users drop off between
 * first visit → install → agent loaded → first task.
 * Auth-protected.
 */

const ANALYTICS_FILE = path.join(
  process.env.HOME || '/tmp',
  '.openclaw', '.status', 'analytics.jsonl'
);

// The funnel steps in order
const FUNNEL_STEPS = [
  'page_view',
  'demo_started',
  'install_copied',
  'first_agent_loaded',
  'npc_clicked',
  'quest_viewed',
  'first_task_completed',
] as const;

function readEvents(): Record<string, unknown>[] {
  try {
    if (!fs.existsSync(ANALYTICS_FILE)) return [];
    const lines = fs.readFileSync(ANALYTICS_FILE, 'utf-8').trim().split('\n');
    return lines
      .filter(line => line.trim())
      .map(line => { try { return JSON.parse(line); } catch { return null; } })
      .filter((e): e is Record<string, unknown> => e !== null);
  } catch {
    return [];
  }
}

function checkAuth(req: NextRequest): boolean {
  const tokenPath = path.join(process.env.HOME || '~', '.openclaw', '.openclawfice-token');
  try {
    const expectedToken = fs.readFileSync(tokenPath, 'utf-8').trim();
    const provided = req.headers.get('x-openclawfice-token') || '';
    return provided === expectedToken;
  } catch {
    return true;
  }
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const events = readEvents();

  // Group by visitor
  const visitors: Record<string, {
    events: Set<string>;
    firstSeen: number;
    timestamps: Record<string, number>;
  }> = {};

  for (const e of events) {
    const vid = (e.visitorId as string) || 'unknown';
    if (!visitors[vid]) {
      visitors[vid] = {
        events: new Set(),
        firstSeen: e.timestamp as number || Date.now(),
        timestamps: {},
      };
    }
    const eventName = e.event as string;
    visitors[vid].events.add(eventName);
    if (!visitors[vid].timestamps[eventName]) {
      visitors[vid].timestamps[eventName] = e.timestamp as number || Date.now();
    }
  }

  const totalVisitors = Object.keys(visitors).length;

  // Calculate funnel
  const funnel = FUNNEL_STEPS.map(step => {
    const reached = Object.values(visitors).filter(v => v.events.has(step)).length;
    return {
      step,
      reached,
      rate: totalVisitors > 0 ? reached / totalVisitors : 0,
    };
  });

  // Calculate drop-off between steps
  const dropOff = funnel.map((step, i) => {
    if (i === 0) return { step: step.step, dropRate: 0 };
    const prev = funnel[i - 1];
    return {
      step: step.step,
      dropRate: prev.reached > 0 ? 1 - (step.reached / prev.reached) : 0,
    };
  });

  // Calculate time-to-first-task for visitors who completed it
  const timeToTask: number[] = [];
  for (const v of Object.values(visitors)) {
    if (v.events.has('first_task_completed') && v.timestamps['first_task_completed']) {
      const startTime = v.timestamps['page_view'] || v.timestamps['install_copied'] || v.firstSeen;
      const taskTime = v.timestamps['first_task_completed'];
      if (taskTime > startTime) {
        timeToTask.push(taskTime - startTime);
      }
    }
  }

  // Feature engagement (what features do users actually discover?)
  const featureEvents = ['npc_clicked', 'quest_viewed', 'card_shared', 'keyboard_shortcut',
    'konami_code', 'music_toggled', 'meeting_started', 'water_cooler_opened', 'settings_opened'];
  const featureDiscovery = featureEvents.map(feat => ({
    feature: feat,
    usersDiscovered: Object.values(visitors).filter(v => v.events.has(feat)).length,
    discoveryRate: totalVisitors > 0
      ? Object.values(visitors).filter(v => v.events.has(feat)).length / totalVisitors
      : 0,
  }));

  featureDiscovery.sort((a, b) => b.usersDiscovered - a.usersDiscovered);

  return NextResponse.json({
    totalVisitors,
    funnel,
    dropOff,
    featureDiscovery,
    timeToFirstTask: {
      samples: timeToTask.length,
      avgMs: timeToTask.length > 0
        ? timeToTask.reduce((a, b) => a + b, 0) / timeToTask.length
        : null,
      medianMs: timeToTask.length > 0
        ? timeToTask.sort((a, b) => a - b)[Math.floor(timeToTask.length / 2)]
        : null,
      p90Ms: timeToTask.length > 0
        ? timeToTask.sort((a, b) => a - b)[Math.floor(timeToTask.length * 0.9)]
        : null,
    },
  });
}
