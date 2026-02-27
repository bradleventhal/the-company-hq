'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuthenticatedFetch } from '../../hooks/useAuthenticatedFetch';

interface CohortData {
  source: string;
  campaign: string;
  visitors: number;
  demoStarted: number;
  installClicked: number;
  firstAgentLoaded: number;
  firstTaskCompleted: number;
  conversionRate: number;
  avgTimeToFirstTaskMs: number | null;
}

interface FunnelStep {
  step: string;
  reached: number;
  rate: number;
}

interface DropOff {
  step: string;
  dropRate: number;
}

interface FeatureRow {
  feature: string;
  usersDiscovered: number;
  discoveryRate: number;
}

interface TemplateRow {
  id: string;
  imports: number;
  runs: number;
  runsWithoutCustomization: number;
  customized: number;
  customizationAbandoned: number;
  bailoutRate: number;
  uniqueUsers: number;
}

export default function AnalyticsPage() {
  const authFetch = useAuthenticatedFetch();
  const [cohorts, setCohorts] = useState<CohortData[]>([]);
  const [funnel, setFunnel] = useState<FunnelStep[]>([]);
  const [dropOff, setDropOff] = useState<DropOff[]>([]);
  const [features, setFeatures] = useState<FeatureRow[]>([]);
  const [templates, setTemplates] = useState<TemplateRow[]>([]);
  const [totalVisitors, setTotalVisitors] = useState(0);
  const [totalEvents, setTotalEvents] = useState(0);
  const [timeRange, setTimeRange] = useState<{ from: string; to: string } | null>(null);
  const [timeToTask, setTimeToTask] = useState<{ avgMs: number | null; medianMs: number | null; samples: number }>({ avgMs: null, medianMs: null, samples: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  const fetchData = useCallback(async () => {
    try {
      const [cohortRes, onboardingRes, templateRes] = await Promise.all([
        authFetch('/api/analytics/cohorts'),
        authFetch('/api/analytics/onboarding'),
        authFetch('/api/analytics/templates'),
      ]);

      if (cohortRes.ok) {
        const data = await cohortRes.json();
        setCohorts(data.cohorts || []);
        setTotalVisitors(data.totalVisitors || 0);
        setTotalEvents(data.totalEvents || 0);
        setTimeRange(data.timeRange || null);
      }

      if (onboardingRes.ok) {
        const data = await onboardingRes.json();
        setFunnel(data.funnel || []);
        setDropOff(data.dropOff || []);
        setFeatures(data.featureDiscovery || []);
        setTimeToTask(data.timeToFirstTask || { avgMs: null, medianMs: null, samples: 0 });
      }

      if (templateRes.ok) {
        const data = await templateRes.json();
        setTemplates(data.templates || []);
      }

      setError(null);
      setLastRefresh(new Date());
    } catch (err) {
      setError('Failed to load analytics data');
    } finally {
      setLoading(false);
    }
  }, [authFetch]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000); // Auto-refresh every 30s
    return () => clearInterval(interval);
  }, [fetchData]);

  const formatMs = (ms: number | null): string => {
    if (ms === null) return '—';
    if (ms < 1000) return `${ms}ms`;
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
    return `${(ms / 60000).toFixed(1)}m`;
  };

  const pct = (n: number): string => `${(n * 100).toFixed(1)}%`;

  const sectionStyle: React.CSSProperties = {
    background: '#1e293b',
    border: '1px solid #334155',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  };

  const thStyle: React.CSSProperties = {
    textAlign: 'left',
    padding: '8px 12px',
    borderBottom: '1px solid #334155',
    color: '#94a3b8',
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 1,
  };

  const tdStyle: React.CSSProperties = {
    padding: '8px 12px',
    borderBottom: '1px solid #1e293b',
    fontSize: 13,
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#0f172a',
        color: '#e2e8f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '"Press Start 2P", monospace',
        fontSize: 14,
      }}>
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
        Loading analytics...
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0f172a',
      color: '#e2e8f0',
      fontFamily: 'system-ui, sans-serif',
      padding: '24px 32px',
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div>
          <h1 style={{
            fontFamily: '"Press Start 2P", monospace',
            fontSize: 18,
            margin: 0,
            marginBottom: 8,
          }}>
            📊 Analytics
          </h1>
          <div style={{ color: '#64748b', fontSize: 12 }}>
            {totalVisitors} visitors • {totalEvents} events
            {timeRange && ` • ${new Date(timeRange.from).toLocaleDateString()} – ${new Date(timeRange.to).toLocaleDateString()}`}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ color: '#64748b', fontSize: 11 }}>
            Updated {lastRefresh.toLocaleTimeString()}
          </span>
          <button
            onClick={fetchData}
            style={{
              background: '#334155',
              color: '#e2e8f0',
              border: 'none',
              padding: '8px 16px',
              borderRadius: 8,
              cursor: 'pointer',
              fontSize: 12,
            }}
          >
            ↻ Refresh
          </button>
          <a
            href="/"
            style={{
              color: '#6366f1',
              textDecoration: 'none',
              fontSize: 12,
            }}
          >
            ← Office
          </a>
        </div>
      </div>

      {error && (
        <div style={{ background: '#7f1d1d', border: '1px solid #991b1b', borderRadius: 8, padding: 12, marginBottom: 24, fontSize: 13 }}>
          {error}
        </div>
      )}

      {/* Top Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Visitors', value: totalVisitors, icon: '👥' },
          { label: 'Events', value: totalEvents, icon: '📡' },
          { label: 'Demo Starts', value: funnel.find(f => f.step === 'demo_started')?.reached || 0, icon: '🎮' },
          { label: 'Install Copies', value: funnel.find(f => f.step === 'install_copied')?.reached || 0, icon: '📋' },
          { label: 'Avg → Task', value: formatMs(timeToTask.avgMs), icon: '⏱️' },
          { label: 'Sources', value: cohorts.length, icon: '🔗' },
        ].map((stat, i) => (
          <div key={i} style={{
            background: '#1e293b',
            border: '1px solid #334155',
            borderRadius: 12,
            padding: 16,
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 24, marginBottom: 4 }}>{stat.icon}</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#e2e8f0' }}>{stat.value}</div>
            <div style={{ fontSize: 11, color: '#64748b', marginTop: 4 }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Onboarding Funnel */}
      <div style={sectionStyle}>
        <h2 style={{ fontFamily: '"Press Start 2P", monospace', fontSize: 12, marginTop: 0, marginBottom: 16 }}>
          🎯 Onboarding Funnel
        </h2>
        {funnel.length === 0 ? (
          <div style={{ color: '#64748b', fontSize: 13, textAlign: 'center', padding: 20 }}>
            No funnel data yet. Events will appear as users interact with the app.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {funnel.map((step, i) => {
              const drop = dropOff[i];
              const barWidth = funnel[0].reached > 0 ? (step.reached / funnel[0].reached) * 100 : 0;
              return (
                <div key={step.step} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 160, fontSize: 12, color: '#94a3b8', textAlign: 'right' }}>
                    {step.step.replace(/_/g, ' ')}
                  </div>
                  <div style={{ flex: 1, background: '#0f172a', borderRadius: 4, height: 24, position: 'relative' }}>
                    <div style={{
                      width: `${barWidth}%`,
                      height: '100%',
                      background: `hsl(${240 - i * 30}, 70%, 50%)`,
                      borderRadius: 4,
                      transition: 'width 0.5s ease',
                      minWidth: step.reached > 0 ? 2 : 0,
                    }} />
                    <span style={{
                      position: 'absolute',
                      left: 8,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      fontSize: 11,
                      color: '#e2e8f0',
                      fontWeight: 600,
                    }}>
                      {step.reached}
                    </span>
                  </div>
                  <div style={{ width: 60, fontSize: 11, color: drop && drop.dropRate > 0.5 ? '#ef4444' : '#64748b' }}>
                    {drop && i > 0 ? `−${pct(drop.dropRate)}` : ''}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* UTM Cohorts */}
      <div style={sectionStyle}>
        <h2 style={{ fontFamily: '"Press Start 2P", monospace', fontSize: 12, marginTop: 0, marginBottom: 16 }}>
          📡 Traffic Cohorts (by UTM)
        </h2>
        {cohorts.length === 0 ? (
          <div style={{ color: '#64748b', fontSize: 13, textAlign: 'center', padding: 20 }}>
            No cohort data yet. Add ?utm_source=twitter&utm_campaign=thread-name to your links.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={thStyle}>Source</th>
                  <th style={thStyle}>Campaign</th>
                  <th style={thStyle}>Visitors</th>
                  <th style={thStyle}>Demo</th>
                  <th style={thStyle}>Install</th>
                  <th style={thStyle}>Conv %</th>
                  <th style={thStyle}>Avg → Task</th>
                </tr>
              </thead>
              <tbody>
                {cohorts.map((c, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
                    <td style={tdStyle}>{c.source}</td>
                    <td style={{ ...tdStyle, maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.campaign}</td>
                    <td style={tdStyle}>{c.visitors}</td>
                    <td style={tdStyle}>{c.demoStarted}</td>
                    <td style={tdStyle}>{c.installClicked}</td>
                    <td style={{ ...tdStyle, color: c.conversionRate > 0.05 ? '#22c55e' : '#ef4444' }}>{pct(c.conversionRate)}</td>
                    <td style={tdStyle}>{formatMs(c.avgTimeToFirstTaskMs)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Feature Discovery */}
      <div style={sectionStyle}>
        <h2 style={{ fontFamily: '"Press Start 2P", monospace', fontSize: 12, marginTop: 0, marginBottom: 16 }}>
          🎮 Feature Discovery
        </h2>
        {features.length === 0 ? (
          <div style={{ color: '#64748b', fontSize: 13, textAlign: 'center', padding: 20 }}>
            No feature data yet.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {features.map(f => (
              <div key={f.feature} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 160, fontSize: 12, color: '#94a3b8', textAlign: 'right' }}>
                  {f.feature.replace(/_/g, ' ')}
                </div>
                <div style={{ flex: 1, background: '#0f172a', borderRadius: 4, height: 20, position: 'relative' }}>
                  <div style={{
                    width: `${f.discoveryRate * 100}%`,
                    height: '100%',
                    background: '#6366f1',
                    borderRadius: 4,
                    minWidth: f.usersDiscovered > 0 ? 2 : 0,
                  }} />
                  <span style={{
                    position: 'absolute',
                    left: 8,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontSize: 10,
                    color: '#e2e8f0',
                  }}>
                    {f.usersDiscovered} ({pct(f.discoveryRate)})
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Template Usage */}
      <div style={sectionStyle}>
        <h2 style={{ fontFamily: '"Press Start 2P", monospace', fontSize: 12, marginTop: 0, marginBottom: 16 }}>
          📋 Template Usage
        </h2>
        {templates.length === 0 ? (
          <div style={{ color: '#64748b', fontSize: 13, textAlign: 'center', padding: 20 }}>
            No template data yet.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={thStyle}>Template</th>
                  <th style={thStyle}>Imports</th>
                  <th style={thStyle}>Runs</th>
                  <th style={thStyle}>As-Is</th>
                  <th style={thStyle}>Customized</th>
                  <th style={thStyle}>Bail %</th>
                  <th style={thStyle}>Users</th>
                </tr>
              </thead>
              <tbody>
                {templates.map((t, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
                    <td style={tdStyle}>{t.id}</td>
                    <td style={tdStyle}>{t.imports}</td>
                    <td style={tdStyle}>{t.runs}</td>
                    <td style={tdStyle}>{t.runsWithoutCustomization}</td>
                    <td style={tdStyle}>{t.customized}</td>
                    <td style={{ ...tdStyle, color: t.bailoutRate > 0.3 ? '#ef4444' : '#64748b' }}>{pct(t.bailoutRate)}</td>
                    <td style={tdStyle}>{t.uniqueUsers}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', color: '#475569', fontSize: 11, marginTop: 32, paddingBottom: 24 }}>
        Auto-refreshes every 30s • Data stored locally in analytics.jsonl • No external tracking
      </div>
    </div>
  );
}
