import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

/**
 * GET /api/analytics/templates
 * 
 * Aggregates template usage from analytics.jsonl.
 * Shows which templates are imported, customized, and where users bail out.
 * Auth-protected.
 */

const ANALYTICS_FILE = path.join(
  process.env.HOME || '/tmp',
  '.openclaw', '.status', 'analytics.jsonl'
);

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

  // Filter template-related events
  const templateEvents = events.filter(e =>
    typeof e.event === 'string' && e.event.startsWith('template_')
  );

  // Group by template
  const templates: Record<string, {
    id: string;
    imports: number;
    runs: number;
    runsWithoutCustomization: number;
    customizationStarted: number;
    customizationAbandoned: number;
    fieldsChanged: Record<string, number>;
    sessions: Set<string>;
  }> = {};

  for (const e of templateEvents) {
    const templateId = (e.template as string) || (e.template_id as string) || 'unknown';
    if (!templates[templateId]) {
      templates[templateId] = {
        id: templateId,
        imports: 0,
        runs: 0,
        runsWithoutCustomization: 0,
        customizationStarted: 0,
        customizationAbandoned: 0,
        fieldsChanged: {},
        sessions: new Set(),
      };
    }

    const t = templates[templateId];
    const sessionId = e.sessionId as string || 'unknown';
    t.sessions.add(sessionId);

    switch (e.event) {
      case 'template_imported':
        t.imports++;
        break;
      case 'template_run':
        t.runs++;
        if (!e.is_customized) t.runsWithoutCustomization++;
        break;
      case 'template_customization_started':
        t.customizationStarted++;
        break;
      case 'template_customization_abandoned':
        t.customizationAbandoned++;
        break;
      case 'template_field_changed':
        const field = (e.field_name as string) || (e.field as string) || 'unknown';
        t.fieldsChanged[field] = (t.fieldsChanged[field] || 0) + 1;
        break;
    }
  }

  const result = Object.values(templates).map(t => ({
    id: t.id,
    imports: t.imports,
    runs: t.runs,
    runsWithoutCustomization: t.runsWithoutCustomization,
    customized: t.runs - t.runsWithoutCustomization,
    customizationStarted: t.customizationStarted,
    customizationAbandoned: t.customizationAbandoned,
    bailoutRate: t.customizationStarted > 0
      ? t.customizationAbandoned / t.customizationStarted
      : 0,
    fieldsChanged: t.fieldsChanged,
    uniqueUsers: t.sessions.size,
  }));

  result.sort((a, b) => b.imports - a.imports);

  return NextResponse.json({
    totalTemplateEvents: templateEvents.length,
    templates: result,
  });
}
