'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AffiliatePage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [twitter, setTwitter] = useState('');
  const [result, setResult] = useState<{ refCode: string; referralLink: string; dashboardLink: string } | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/affiliate/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, twitter: twitter || undefined }),
      });

      const data = await res.json();
      if (data.ok) {
        setResult(data.affiliate);
      } else {
        setError(data.error || 'Signup failed');
      }
    } catch {
      setError('Network error — try again');
    } finally {
      setLoading(false);
    }
  };

  const copyLink = () => {
    if (result) {
      navigator.clipboard.writeText(result.referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    background: '#0f172a',
    border: '2px solid #334155',
    borderRadius: 8,
    color: '#e2e8f0',
    fontSize: 14,
    outline: 'none',
    boxSizing: 'border-box',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: 6,
    fontSize: 11,
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: 1,
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
      color: '#e2e8f0',
      fontFamily: 'system-ui, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '40px 20px',
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />

      <div style={{ maxWidth: 560, width: '100%' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>💰</div>
          <h1 style={{
            fontFamily: '"Press Start 2P", monospace',
            fontSize: 18,
            margin: 0,
            marginBottom: 12,
            lineHeight: 1.6,
          }}>
            Affiliate Program
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 15, lineHeight: 1.6, margin: 0 }}>
            Earn <strong style={{ color: '#22c55e' }}>30% recurring commission</strong> for every Pro subscriber you refer.
            Share your link, get paid monthly.
          </p>
        </div>

        {/* Stats preview */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 12,
          marginBottom: 32,
        }}>
          {[
            { label: 'Commission', value: '30%', sub: 'recurring' },
            { label: 'Pro Price', value: '$9/mo', sub: '$79/year' },
            { label: 'Cookie', value: '30 days', sub: 'attribution' },
          ].map((s, i) => (
            <div key={i} style={{
              background: '#1e293b',
              border: '1px solid #334155',
              borderRadius: 12,
              padding: 16,
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#e2e8f0' }}>{s.value}</div>
              <div style={{ fontSize: 10, color: '#64748b', marginTop: 4 }}>{s.label}</div>
              <div style={{ fontSize: 9, color: '#475569', marginTop: 2 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {!result ? (
          /* Signup form */
          <form onSubmit={handleSubmit} style={{
            background: '#1e293b',
            border: '1px solid #334155',
            borderRadius: 16,
            padding: 28,
          }}>
            <h2 style={{
              fontFamily: '"Press Start 2P", monospace',
              fontSize: 12,
              margin: '0 0 24px 0',
            }}>
              🎮 Join the Program
            </h2>

            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Name *</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your name or brand"
                required
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Email *</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={labelStyle}>Twitter (optional)</label>
              <input
                type="text"
                value={twitter}
                onChange={e => setTwitter(e.target.value)}
                placeholder="@yourusername"
                style={inputStyle}
              />
            </div>

            {error && (
              <div style={{
                background: '#7f1d1d',
                border: '1px solid #991b1b',
                borderRadius: 8,
                padding: 12,
                marginBottom: 16,
                fontSize: 13,
              }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '14px 24px',
                background: loading ? '#475569' : '#6366f1',
                color: '#fff',
                border: 'none',
                borderRadius: 12,
                fontSize: 14,
                fontWeight: 700,
                cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: '"Press Start 2P", monospace',
                transition: 'all 0.15s',
              }}
            >
              {loading ? 'SIGNING UP...' : 'GET MY LINK →'}
            </button>
          </form>
        ) : (
          /* Success state */
          <div style={{
            background: '#1e293b',
            border: '2px solid #22c55e',
            borderRadius: 16,
            padding: 28,
          }}>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <div style={{ fontSize: 40, marginBottom: 8 }}>🎉</div>
              <h2 style={{
                fontFamily: '"Press Start 2P", monospace',
                fontSize: 14,
                margin: 0,
                color: '#22c55e',
              }}>
                You&apos;re in!
              </h2>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>Your Referral Link</label>
              <div style={{
                display: 'flex',
                gap: 8,
                alignItems: 'stretch',
              }}>
                <input
                  type="text"
                  value={result.referralLink}
                  readOnly
                  style={{
                    ...inputStyle,
                    flex: 1,
                    background: '#0f172a',
                    border: '2px solid #22c55e',
                    fontSize: 12,
                  }}
                  onClick={e => (e.target as HTMLInputElement).select()}
                />
                <button
                  onClick={copyLink}
                  style={{
                    padding: '12px 20px',
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
                  {copied ? '✓ COPIED' : '📋 COPY'}
                </button>
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>Your Ref Code</label>
              <code style={{
                display: 'block',
                padding: '10px 16px',
                background: '#0f172a',
                borderRadius: 8,
                fontSize: 16,
                fontWeight: 700,
                color: '#6366f1',
              }}>
                {result.refCode}
              </code>
            </div>

            <div style={{
              background: '#0f172a',
              borderRadius: 12,
              padding: 16,
              marginBottom: 20,
            }}>
              <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 8 }}>How it works:</div>
              <ol style={{ margin: 0, paddingLeft: 20, fontSize: 13, lineHeight: 1.8, color: '#94a3b8' }}>
                <li>Share your referral link with your audience</li>
                <li>They visit openclawfice.com and try it out</li>
                <li>When they upgrade to Pro, you earn <strong style={{ color: '#22c55e' }}>$2.70/month</strong></li>
                <li>Commissions are recurring — you earn every month they stay subscribed</li>
              </ol>
            </div>

            <a
              href={`/affiliate/dashboard?ref=${result.refCode}`}
              style={{
                display: 'block',
                width: '100%',
                padding: '14px 24px',
                background: '#334155',
                color: '#e2e8f0',
                border: 'none',
                borderRadius: 12,
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: '"Press Start 2P", monospace',
                textAlign: 'center',
                textDecoration: 'none',
                boxSizing: 'border-box',
              }}
            >
              VIEW DASHBOARD →
            </a>
          </div>
        )}

        {/* How it works section */}
        <div style={{
          marginTop: 40,
          background: '#1e293b',
          border: '1px solid #334155',
          borderRadius: 16,
          padding: 28,
        }}>
          <h2 style={{
            fontFamily: '"Press Start 2P", monospace',
            fontSize: 12,
            margin: '0 0 20px 0',
          }}>
            💡 Why Join?
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { icon: '💰', title: '30% Recurring', desc: 'Earn $2.70/month per subscriber. 50 referrals = $135/month passive.' },
              { icon: '🍪', title: '30-Day Cookie', desc: 'Visitors who click your link have 30 days to convert. No pressure.' },
              { icon: '📊', title: 'Real-Time Dashboard', desc: 'Track clicks, conversions, and earnings. See exactly what\'s working.' },
              { icon: '🎨', title: 'Shareable Product', desc: 'Pixel art agents are inherently shareable. Your audience will love it.' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ fontSize: 24, flexShrink: 0 }}>{item.icon}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{item.title}</div>
                  <div style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.5 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: 32, paddingBottom: 32 }}>
          <Link href="/" style={{ color: '#6366f1', textDecoration: 'none', fontSize: 13 }}>
            ← Back to OpenClawfice
          </Link>
        </div>
      </div>
    </div>
  );
}
