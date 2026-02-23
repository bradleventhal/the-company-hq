import { NextResponse } from 'next/server';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';

const STATUS_DIR = join(homedir(), '.openclaw', '.status');
const MEETING_FILE = join(STATUS_DIR, 'meeting.json');

export async function GET() {
  try {
    if (!existsSync(MEETING_FILE)) {
      return NextResponse.json({ active: false });
    }

    const data = JSON.parse(readFileSync(MEETING_FILE, 'utf-8'));
    
    // Return meeting data
    return NextResponse.json({
      active: data.active || false,
      topic: data.topic || '',
      participants: data.participants || [],
      currentRound: data.currentRound || 1,
      maxRounds: data.maxRounds || 4,
      startedAt: data.startedAt || Date.now(),
      lastMessage: data.lastMessage || '',
    });
  } catch (err) {
    console.error('Failed to read meeting.json:', err);
    return NextResponse.json({ active: false });
  }
}
