import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import { homedir } from 'os';
import path from 'path';

/**
 * Start a manual meeting between agents
 * POST body: { topic: string, participants?: string[] }
 */
export async function POST(req: Request) {
  try {
    const { topic, participants } = await req.json();
    
    if (!topic) {
      return NextResponse.json({ error: 'Topic required' }, { status: 400 });
    }
    
    const meetingFile = path.join(homedir(), '.openclaw', '.status', 'meeting.json');
    
    // If no participants specified, invite all active agents
    let agentIds = participants;
    if (!agentIds || agentIds.length === 0) {
      const configFile = path.join(homedir(), '.openclaw', 'openclaw.json');
      try {
        const configData = await fs.readFile(configFile, 'utf-8');
        const config = JSON.parse(configData);
        agentIds = config.agents?.list?.map((a: any) => a.id) || [];
      } catch {
        agentIds = [];
      }
    }
    
    const meeting = {
      active: true,
      topic,
      participants: agentIds,
      currentRound: 1,
      maxRounds: 5,
      startedAt: Date.now(),
      lastMessage: `Meeting started: ${topic}`,
    };
    
    await fs.writeFile(meetingFile, JSON.stringify(meeting, null, 2));
    
    return NextResponse.json({ success: true, meeting });
  } catch (error: any) {
    console.error('Failed to start meeting:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
