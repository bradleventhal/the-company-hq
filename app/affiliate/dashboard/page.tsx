'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

interface DashboardData {
  affiliate: {
    name: string;
    refCode: string;
    referralLink: string;
    joinedAt: string;
  };
  stats: {
    totalClicks: number;
    conversions: number;
    conversionRate: number;
    totalEarnings: number;
    monthlyEarnings: number;
  };
  dailyClicks: Record<string, number>;
  recentReferrals: Array<{
    date: string;
    page: string;
    converted: boolean;
    plan?: string;
  }>;
  commissionRate: number;
  proPrice: number;
}

export default function AffiliateDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const fetchData = useCallback(async () => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref');

    if (!ref) {
      setError('Missing ref parameter. Use ?ref=your-code');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`/api/affiliate/dashboard?ref=${ref}`);
      if (!res.ok) {
        const err = await res.json();
        setError(err.error || 'Failed to load dashboard');
        return;
      }
      setData(await res.json());
      setError('');
    } catch {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const copyLink = () => {
    if (data) {
      navigator.clipboard.writeText(data.affiliate.referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const pct = (n: number) => `${(n * 100).toFixed(1)}%`;
  const usd = (n: number) => `$${n.toFixed(2)}`;

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
        Loading dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#0f172a',
        color: '#e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, sans-serif',
        gap: 16,
      }}>
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
        <div style={{ fontSize: 40 }}>😵</div>
        <div style={{ fontSize: 14, color: '#ef4444' }}>{error}</div>
        <Link href="/affiliate" style={{ color: '#6366f1', textDecoration: 'none', fontSize: 13 }}>
          ← Sign up for the affiliate program
        </Link>
      </div>
    );
  }

  if (!data) return null;

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

  // Build sparkline from daily clicks
  const days = Object.entries(data.dailyClicks).sort((a, b) => a[0].localeCompare(b[0]));
  const maxClicks = Math.max(1, ...days.map(d => d[1]));

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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{
            fontFamily: '"Press Start 2P", monospace',
            fontSize: 16,
            margin: 0,
            marginBottom: 8,
          }}>
            💰 {data.affiliate.name}&apos;s Dashboard
          </h1>
          <div style={{ color: '#64748b', fontSize: 12 }}>
            Joined {new Date(data.affiliate.joinedAt).toLocaleDateString()} • Ref: <code style={{ color: '#6366f1' }}>{data.affiliate.refCode}</code>
          </div>
        </div>
        <Link href="/affiliate" style={{ color: '#6366f1', textDecoration: 'none', fontSize: 12 }}>
          ← Back
        </Link>
      </div>

      {/* Top stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Total Clicks', value: data.stats.totalClicks, icon: '🔗', color: '#e2e8f0' },
          { label: 'Conversions', value: data.stats.conversions, icon: '✅', color: '#22c55e' },
          { label: 'Conv. Rate', value: pct(data.stats.conversionRate), icon: '📊', color: '#6366f1' },
          { label: 'This Month', value: usd(data.stats.monthlyEarnings), icon: '💰', color: '#22c55e' },
          { label: 'Total Earned', value: usd(data.stats.totalEarnings), icon: '🏆', color: '#f59e0b' },
        ].map((stat, i) => (
          <div key={i} style={{
            background: '#1e293b',
            border: '1px solid #334155',
            borderRadius: 12,
            padding: 16,
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 24, marginBottom: 4 }}>{stat.icon}</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: stat.color }}>{stat.value}</div>
            <div style={{ fontSize: 10, color: '#64748b', marginTop: 4 }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Referral link */}
      <div style={sectionStyle}>
        <h2 style={{ fontFamily: '"Press Start 2P", monospace', fontSize: 11, marginTop: 0, marginBottom: 12 }}>
          🔗 Your Referral Link
        </h2>
        <div style={{ display: 'flex', gap: 8, alignItems: 'stretch' }}>
          <input
            type="text"
            value={data.affiliate.referralLink}
            readOnly
            style={{
              flex: 1,
              padding: '10px 14px',
              background: '#0f172a',
              border: '2px solid #334155',
              borderRadius: 8,
              color: '#6ee7b7',
              fontSize: 13,
              fontFamily: 'monospace',
              outline: 'none',
            }}
            onClick={e => (e.target as HTMLInputElement).select()}
          />
          <button
            onClick={copyLink}
            style={{
              padding: '10px 20px',
              background: copied ? '#22c55e' : '#6366f1',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 700,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            {copied ? '✓ Copied' : '📋 Copy'}
          </button>
        </div>
      </div>

      {/* Click chart */}
      <div style={sectionStyle}>
        <h2 style={{ fontFamily: '"Press Start 2P", monospace', fontSize: 11, marginTop: 0, marginBottom: 12 }}>
          📈 Clicks (Last 30 Days)
        </h2>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 80 }}>
          {days.map(([date, count]) => (
            <div
              key={date}
              title={`${date}: ${count} clicks`}
              style={{
                flex: 1,
                height: `${(count / maxClicks) * 100}%`,
                minHeight: count > 0 ? 4 : 1,
                background: count > 0 ? '#6366f1' : '#1e293b',
                borderRadius: 2,
                cursor: 'default',
              }}
            />
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, fontSize: 9, color: '#475569' }}>
          <span>{days[0]?.[0]}</span>
          <span>{days[days.length - 1]?.[0]}</span>
        </div>
      </div>

      {/* Recent referrals */}
      <div style={sectionStyle}>
        <h2 style={{ fontFamily: '"Press Start 2P", monospace', fontSize: 11, marginTop: 0, marginBottom: 12 }}>
          📋 Recent Referrals
        </h2>
        {data.recentReferrals.length === 0 ? (
          <div style={{ color: '#64748b', fontSize: 13, textAlign: 'center', padding: 20 }}>
            No referrals yet. Share your link to get started!
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={thStyle}>Date</th>
                  <th style={thStyle}>Page</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Earned</th>
                </tr>
              </thead>
              <tbody>
                {data.recentReferrals.map((r, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
                    <td style={tdStyle}>{new Date(r.date).toLocaleDateString()}</td>
                    <td style={tdStyle}>{r.page}</td>
                    <td style={{
                      ...tdStyle,
                      color: r.converted ? '#22c55e' : '#64748b',
                      fontWeight: r.converted ? 700 : 400,
                    }}>
                      {r.converted ? `✅ Pro (${r.plan || 'monthly'})` : '🔗 Click'}
                    </td>
                    <td style={{ ...tdStyle, color: r.converted ? '#22c55e' : '#64748b' }}>
                      {r.converted ? `$${(9 * 0.30).toFixed(2)}/mo` : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Earnings projection */}
      <div style={sectionStyle}>
        <h2 style={{ fontFamily: '"Press Start 2P", monospace', fontSize: 11, marginTop: 0, marginBottom: 12 }}>
          🎯 Earnings Projection
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
          {[10, 50, 100, 500].map(refs => {
            const convRate = 0.05; // 5% conservative
            const monthly = refs * convRate * 9 * 0.30;
            return (
              <div key={refs} style={{
                background: '#0f172a',
                borderRadius: 8,
                padding: 14,
                textAlign: 'center',
              }}>
                <div style={{ fontSize: 11, color: '#64748b' }}>{refs} referrals</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#22c55e', margin: '4px 0' }}>
                  {usd(monthly)}/mo
                </div>
                <div style={{ fontSize: 9, color: '#475569' }}>at 5% conversion</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', color: '#475569', fontSize: 11, marginTop: 32, paddingBottom: 24 }}>
        Auto-refreshes every 30s • 30% commission on $9/mo Pro subscriptions
      </div>
    </div>
  );
}
