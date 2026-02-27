import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

/**
 * POST /api/analytics/track
 * 
 * Append-only JSONL event log. Each line is a JSON event object.
 * Stored at ~/.openclaw/.status/analytics.jsonl
 * 
 * No auth required — events are anonymous (session/visitor IDs are random, client-generated).
 * On Vercel (no filesystem), returns 200 but doesn't persist (Vercel Analytics handles prod).
 */

const ANALYTICS_DIR = path.join(process.env.HOME || '/tmp', '.openclaw', '.status');
const ANALYTICS_FILE = path.join(ANALYTICS_DIR, 'analytics.jsonl');

// Max file size: 50MB. After that, rotate.
const MAX_FILE_SIZE = 50 * 1024 * 1024;

function ensureDir() {
  try {
    if (!fs.existsSync(ANALYTICS_DIR)) {
      fs.mkdirSync(ANALYTICS_DIR, { recursive: true });
    }
  } catch {
    // On Vercel or read-only fs, just skip
  }
}

function rotateIfNeeded() {
  try {
    const stats = fs.statSync(ANALYTICS_FILE);
    if (stats.size > MAX_FILE_SIZE) {
      const rotatedPath = ANALYTICS_FILE.replace('.jsonl', `-${Date.now()}.jsonl`);
      fs.renameSync(ANALYTICS_FILE, rotatedPath);
    }
  } catch {
    // File doesn't exist yet, that's fine
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate: must have an event field
    if (!body.event || typeof body.event !== 'string') {
      return NextResponse.json({ error: 'Missing event field' }, { status: 400 });
    }

    // Add server-side metadata
    const event = {
      ...body,
      serverTimestamp: Date.now(),
      ip: req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local',
      userAgent: req.headers.get('user-agent') || undefined,
    };

    // Write to JSONL file
    ensureDir();
    rotateIfNeeded();

    try {
      fs.appendFileSync(ANALYTICS_FILE, JSON.stringify(event) + '\n');
    } catch {
      // On Vercel or read-only fs — event is still tracked via Vercel Analytics client-side
      return NextResponse.json({ ok: true, persisted: false });
    }

    return NextResponse.json({ ok: true, persisted: true });
  } catch {
    return NextResponse.json({ error: 'Failed to track' }, { status: 500 });
  }
}
