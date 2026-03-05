import { NextResponse } from 'next/server';
import registryData from '../../../data/agent-registry.json';
import levelsData from '../../../data/agent-levels.json';
import tasksData from '../../../data/task-tracker.json';

/**
 * The Company HQ — static data API
 * Serves agent data from shared JSON files in OpenClawfice Agent format.
 * No auth required — this is Brad's private dashboard.
 */

// Team color mapping
const TEAM_COLORS: Record<string, string> = {
  main: '#00d4ff', wade: '#ff3b5c', elon: '#22c55e', cio: '#7c3aed',
  jarvis: '#eab308', steward: '#ff6b2b', saban: '#dc2626',
  steph: '#00ff88', cp3: '#3b82f6', marino: '#f97316', jokic: '#6366f1', jjettas: '#ec4899',
  mahomes: '#a855f7', ai: '#f59e0b',
  ohtani: '#ef4444', giannis: '#10b981',
  achane: '#06b6d4', tyreek: '#fbbf24', brady: '#64748b', magic: '#d946ef', jimmy: '#f43f5e',
};

// Skin/hair/shirt overrides for recognizable NPCs
const NPC_OVERRIDES: Record<string, { skinColor?: string; shirtColor?: string; hairColor?: string }> = {
  main: { skinColor: '#9f6947', shirtColor: '#7c3aed', hairColor: '#111827' },     // LeBron
  wade: { skinColor: '#9f6947', shirtColor: '#ff3b5c', hairColor: '#111827' },      // Wade  
  elon: { skinColor: '#f3d6bf', shirtColor: '#1a1a2e', hairColor: '#6b3f2a' },      // Elon
  cio: { skinColor: '#f3d6bf', shirtColor: '#1e3a8a', hairColor: '#6b3f2a' },       // McVay
  steph: { skinColor: '#d8a67f', shirtColor: '#1d4ed8', hairColor: '#6b3f2a' },     // Curry
  marino: { skinColor: '#f3d6bf', shirtColor: '#0e7490', hairColor: '#6b3f2a' },    // Marino
  saban: { skinColor: '#f3d6bf', shirtColor: '#991b1b', hairColor: '#94a3b8' },     // Saban
  brady: { skinColor: '#f3d6bf', shirtColor: '#1e3a8a', hairColor: '#6b3f2a' },     // Brady
  mahomes: { skinColor: '#bf875d', shirtColor: '#dc2626', hairColor: '#111827' },   // Mahomes
  ohtani: { skinColor: '#f1cdb6', shirtColor: '#dc2626', hairColor: '#111827' },    // Ohtani
  giannis: { skinColor: '#7f4e34', shirtColor: '#065f46', hairColor: '#111827' },   // Giannis
  magic: { skinColor: '#9f6947', shirtColor: '#7c3aed', hairColor: '#111827' },     // Magic
  jimmy: { skinColor: '#9f6947', shirtColor: '#000000', hairColor: '#111827' },     // Jimmy
  ai: { skinColor: '#7f4e34', shirtColor: '#f5f5f4', hairColor: '#111827' },        // Iverson
  jjettas: { skinColor: '#bf875d', shirtColor: '#f97316', hairColor: '#111827' },   // Ja'Marr
  tyreek: { skinColor: '#9f6947', shirtColor: '#f97316', hairColor: '#111827' },    // Tyreek
  achane: { skinColor: '#9f6947', shirtColor: '#0e7490', hairColor: '#111827' },    // Achane
  cp3: { skinColor: '#9f6947', shirtColor: '#dc2626', hairColor: '#111827' },       // CP3
  jokic: { skinColor: '#f3d6bf', shirtColor: '#1d4ed8', hairColor: '#b37a4c' },     // Jokic
  jarvis: { skinColor: '#9f6947', shirtColor: '#f97316', hairColor: '#111827' },    // Jarvis Landry
  steward: { skinColor: '#f3d6bf', shirtColor: '#dc2626', hairColor: '#2b2a28' },   // Tony Stark
};

// OVR calculation
const GRADE_NUMERIC: Record<string, number> = {
  'A+': 97, 'A': 93, 'A-': 90, 'B+': 87, 'B': 83, 'B-': 80,
  'C+': 77, 'C': 73, 'D': 60, 'F': 40,
};
const TREND_BONUS: Record<string, number> = {
  'new-star': 100, 'up': 80, 'stable': 50, 'down': 20, 'new': 40,
};

function computeOvr(grade: string | null, reps: number, trend: string | null, completed: number, total: number): number {
  const g = grade ? (GRADE_NUMERIC[grade] ?? 50) : 50;
  const taskRate = total > 0 ? (completed / total) * 100 : 50;
  const repsNorm = Math.min(reps / 5, 1) * 100;
  const t = trend ? (TREND_BONUS[trend] ?? 40) : 40;
  return Math.round(Math.min(99, Math.max(1, g * 0.40 + taskRate * 0.20 + repsNorm * 0.15 + t * 0.15 + 50 * 0.10)));
}

export async function GET() {
  const registry = registryData as { agents: any[]; lastUpdated: string };
  const levels = (levelsData as any).agents as Record<string, any>;
  const tasks = (tasksData as any).tasks as any[];

  const agents = registry.agents.map(reg => {
    const level = levels[reg.id];
    const agentTasks = tasks.filter(t => (t.assignee || t.owner) === reg.id);
    const completedTasks = agentTasks.filter(t => t.status === 'complete' || t.status === 'completed');
    const lastCompleted = completedTasks.sort((a,b)=> new Date(b.completed||0).getTime()-new Date(a.completed||0).getTime())[0];
    const completedRecently = lastCompleted && (Date.now() - new Date(lastCompleted.completed).getTime()) < 60*60*1000;
    const inProgressTasks = agentTasks.filter(t => t.status === 'in-progress' || t.status === 'code-complete-deploy-blocked' || t.status === 'queued');

    const grade = level?.grade ?? (reg.grade && reg.grade !== 'pending' ? reg.grade : null);
    const reps = level?.reps ?? 0;
    const trend = level?.trend ?? null;
    const ovr = computeOvr(grade, reps, trend, completedTasks.length, agentTasks.length);

    const isWorking = reg.botStatus === 'active' && inProgressTasks.length > 0;
    const isIdleRecent = !isWorking && completedRecently;
    const mood = isWorking ? (ovr >= 80 ? 'great' : 'good') : isIdleRecent ? 'good' : (ovr >= 55 ? 'okay' : 'stressed');

    const overrides = NPC_OVERRIDES[reg.id] || {};

    return {
      id: reg.id,
      name: reg.name,
      role: reg.role,
      emoji: reg.emoji,
      color: TEAM_COLORS[reg.id] || '#64748b',
      skinColor: overrides.skinColor,
      shirtColor: overrides.shirtColor,
      hairColor: overrides.hairColor,
      status: isWorking ? 'working' : 'idle',
      mood,
      task: inProgressTasks[0]?.title || level?.lastTask || null,
      thought: isWorking
        ? `Working on ${inProgressTasks[0]?.title?.slice(0,40)}`
        : isIdleRecent
          ? `Finished ${lastCompleted?.title?.slice(0,40)}`
          : null,
      hasIdentity: true,
      isNew: reg.botStatus === 'needs-bot',
      level: ovr,
      xp: completedTasks.length * 200 + reps * 100,
      needs: {
        energy: 50 + (ovr % 40),
        output: Math.min(100, completedTasks.length * 20 + 30),
        collab: 60,
        queue: inProgressTasks.length > 0 ? 80 : 20,
        focus: isWorking ? 90 : 40,
      },
      skills: [
        { name: grade || 'Ungraded', level: ovr, icon: '📊' },
        { name: `${reps} reps`, level: Math.min(20, reps * 4), icon: '🏋️' },
        { name: `${completedTasks.length} done`, level: Math.min(20, completedTasks.length * 4), icon: '✅' },
      ],
      // Extra fields for our tabs
      _grade: grade,
      _reps: reps,
      _trend: trend,
      _ovr: ovr,
      _botStatus: reg.botStatus,
      _completedTasks: completedTasks.length,
      _totalTasks: agentTasks.length,
      _lastTask: level?.lastTask || null,
      _gradeHistory: level?.history || [],
      _team: reg.id,
    };
  });

  // Activity log from task tracker
  const activityLog = tasks
    .filter(t => t.completed || t.created)
    .map(t => {
      const agent = agents.find(a => a.id === (t.assignee || t.owner));
      const status = t.status === 'complete' || t.status === 'completed' ? 'completed' : t.status;
      return {
        type: status === 'completed' ? 'task_complete' : status === 'in-progress' ? 'task_start' : 'status',
        agent: agent?.name || t.assignee || t.owner,
        agentId: t.assignee || t.owner,
        detail: t.title,
        timestamp: t.completed || t.created,
        icon: status === 'completed' ? '✅' : status === 'in-progress' ? '🔨' : '📋',
      };
    })
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return NextResponse.json({
    agents,
    activityLog,
    chatLog: [],
    setupCheck: { status: 'ok' },
  });
}
