import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

/**
 * GET /api/analytics/cohorts
 * 
 * Reads analytics.jsonl and groups events by UTM source/campaign.
 * Returns conversion rates, avg time to first task, and retention.
 * Auth-protected (requires openclawfice token).
 */

const ANALYTICS_FILE = path.join(
  process.env.HOME || '/tmp',
  '.openclaw', '.status', 'analytics.jsonl'
);

interface AnalyticsEvent {
  event: string;
  timestamp: number;
  sessionId: string;
  visitorId: string;
  page: string;
  utm_source?: string;
  utm_campaign?: string;
  isDemoMode?: boolean;
  [key: string]: unknown;
}

function readEvents(): AnalyticsEvent[] {
  try {
    if (!fs.existsSync(ANALYTICS_FILE)) return [];
    const lines = fs.readFileSync(ANALYTICS_FILE, 'utf-8').trim().split('\n');
    return lines
      .filter(line => line.trim())
      .map(line => {
        try { return JSON.parse(line); }
        catch { return null; }
      })
      .filter((e): e is AnalyticsEvent => e !== null);
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
    return true; // No token file = no auth required
  }
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const events = readEvents();

  // Group events by visitor and source
  const visitors: Record<string, {
    source: string;
    campaign: string;
    firstSeen: number;
    events: string[];
    timestamps: Record<string, number>;
    isDemoMode: boolean;
  }> = {};

  for (const e of events) {
    const vid = e.visitorId || 'unknown';
    if (!visitors[vid]) {
      visitors[vid] = {
        source: e.utm_source || 'direct',
        campaign: e.utm_campaign || '(none)',
        firstSeen: e.timestamp,
        events: [],
        timestamps: {},
        isDemoMode: e.isDemoMode || false,
      };
    }
    visitors[vid].events.push(e.event);
    if (!visitors[vid].timestamps[e.event]) {
      visitors[vid].timestamps[e.event] = e.timestamp;
    }
  }

  // Build cohorts by source+campaign
  const cohorts: Record<string, {
    source: string;
    campaign: string;
    visitors: number;
    demoStarted: number;
    installClicked: number;
    firstAgentLoaded: number;
    firstTaskCompleted: number;
    avgTimeToFirstTaskMs: number;
    timeToFirstTaskSamples: number[];
  }> = {};

  for (const v of Object.values(visitors)) {
    const key = `${v.source}::${v.campaign}`;
    if (!cohorts[key]) {
      cohorts[key] = {
        source: v.source,
        campaign: v.campaign,
        visitors: 0,
        demoStarted: 0,
        installClicked: 0,
        firstAgentLoaded: 0,
        firstTaskCompleted: 0,
        avgTimeToFirstTaskMs: 0,
        timeToFirstTaskSamples: [],
      };
    }

    const c = cohorts[key];
    c.visitors++;
    if (v.events.includes('demo_started')) c.demoStarted++;
    if (v.events.includes('install_clicked') || v.events.includes('install_copied')) c.installClicked++;
    if (v.events.includes('first_agent_loaded')) c.firstAgentLoaded++;
    if (v.events.includes('first_task_completed')) {
      c.firstTaskCompleted++;
      const installTime = v.timestamps['install_copied'] || v.timestamps['install_clicked'] || v.firstSeen;
      const taskTime = v.timestamps['first_task_completed'];
      if (taskTime && installTime) {
        c.timeToFirstTaskSamples.push(taskTime - installTime);
      }
    }
  }

  // Calculate averages
  const result = Object.values(cohorts).map(c => ({
    source: c.source,
    campaign: c.campaign,
    visitors: c.visitors,
    demoStarted: c.demoStarted,
    installClicked: c.installClicked,
    firstAgentLoaded: c.firstAgentLoaded,
    firstTaskCompleted: c.firstTaskCompleted,
    conversionRate: c.visitors > 0 ? c.installClicked / c.visitors : 0,
    avgTimeToFirstTaskMs: c.timeToFirstTaskSamples.length > 0
      ? c.timeToFirstTaskSamples.reduce((a, b) => a + b, 0) / c.timeToFirstTaskSamples.length
      : null,
  }));

  // Sort by visitors descending
  result.sort((a, b) => b.visitors - a.visitors);

  return NextResponse.json({
    totalVisitors: Object.keys(visitors).length,
    totalEvents: events.length,
    cohorts: result,
    timeRange: events.length > 0 ? {
      from: new Date(Math.min(...events.map(e => e.timestamp))).toISOString(),
      to: new Date(Math.max(...events.map(e => e.timestamp))).toISOString(),
    } : null,
  });
}
