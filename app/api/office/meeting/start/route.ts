import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';

const MEETING_FILE = path.join(os.homedir(), '.openclaw', 'openclawfice-meeting.json');

/**
 * Generate a synthetic meeting transcript based on topic and participants.
 * Creates realistic back-and-forth discussion with 4-8 messages.
 */
function generateMeetingTranscript(topic: string, participants: string[], startTime: number): any[] {
  const transcript: any[] = [];
  
  // Agent name mapping (handle both IDs and display names)
  const agentNames: Record<string, string> = {
    'ocf-pm': 'Nova',
    'nova': 'Nova',
    'ocf-dev': 'Forge',
    'forge': 'Forge',
    'openclawfice': 'Pixel',
    'pixel': 'Pixel',
    'outreach': 'Scout',
    'scout': 'Scout',
    'main': 'Cipher',
    'cipher': 'Cipher',
  };

  const getName = (id: string) => agentNames[id.toLowerCase()] || id;

  // Generate contextual opening based on topic keywords
  let openingMessages: Record<string, string[]> = {
    security: [
      "Let's review these security findings carefully",
      "I've looked at the CodeQL results. Most seem like false positives for localhost apps",
      "Agreed. Should we prioritize the real vulnerabilities first?",
      "The log injection issues are legit - we should fix those",
    ],
    bug: [
      "Found a critical bug in production",
      "What's the impact? Can we reproduce it locally?",
      "Reproduced - it affects user authentication",
      "Priority fix. I'll start on it now",
    ],
    feature: [
      "Let's scope out this new feature request",
      "What's the user story here?",
      "Users want to see agent conversations in real-time",
      "That's actually straightforward - we have the data already",
    ],
    database: [
      "We need to choose a database for this",
      "PostgreSQL or SQLite?",
      "SQLite is simpler but PostgreSQL handles concurrent writes better",
      "Good point. Let's go with PostgreSQL for scalability",
    ],
    design: [
      "The current UI layout needs work",
      "What's the main issue?",
      "Too much information density - users are overwhelmed",
      "Let's add progressive disclosure. Show basics, hide details until clicked",
    ],
  };

  // Find matching template
  const topicLower = topic.toLowerCase();
  let messages = openingMessages.security; // default
  for (const [key, msgs] of Object.entries(openingMessages)) {
    if (topicLower.includes(key)) {
      messages = msgs;
      break;
    }
  }

  // Build transcript with alternating participants
  const numMessages = Math.min(messages.length, 6); // 4-6 messages
  for (let i = 0; i < numMessages; i++) {
    const participantIndex = i % participants.length;
    const agentId = participants[participantIndex];
    const round = Math.floor(i / participants.length) + 1;

    transcript.push({
      agent: getName(agentId),
      message: messages[i] || `Discussing: ${topic}`,
      round,
      timestamp: startTime + (i * 5000), // 5 seconds between messages
    });
  }

  return transcript;
}

export async function POST(req: Request) {
  try {
    const { topic, participants } = await req.json();

    if (!topic || !participants || participants.length < 2) {
      return NextResponse.json(
        { error: 'Meeting requires a topic and at least 2 participants' },
        { status: 400 }
      );
    }

    // Generate synthetic transcript
    const now = Date.now();
    const transcript = generateMeetingTranscript(topic, participants, now);
    
    const meeting = {
      active: true,
      topic,
      participants, // array of agent IDs
      currentRound: Math.ceil(transcript.length / participants.length),
      maxRounds: 4,
      startedAt: now,
      lastMessage: transcript.length > 0 ? transcript[transcript.length - 1].message : `Meeting started: ${topic}`,
      transcript,
    };

    await fs.mkdir(path.dirname(MEETING_FILE), { recursive: true });
    await fs.writeFile(MEETING_FILE, JSON.stringify(meeting, null, 2));

    return NextResponse.json({ success: true, meeting });
  } catch (err: any) {
    console.error('Failed to start meeting:', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to start meeting' },
      { status: 500 }
    );
  }
}
