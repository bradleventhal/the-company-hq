'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface ChangeEntry {
  text: string;
  bold?: string;
}

interface ChangeSection {
  icon: string;
  title: string;
  items: ChangeEntry[];
}

interface Release {
  version: string;
  date: string;
  tagline: string;
  sections: ChangeSection[];
}

const RELEASES: Release[] = [
  {
    version: 'v0.2.0',
    date: 'Feb 28, 2026',
    tagline: 'Polish & Production',
    sections: [
      {
        icon: '👻',
        title: 'UX Polish',
        items: [
          { bold: 'Retro 404 page', text: 'Glitch text, typewriter dialogue, CRT scanlines, ghost NPC' },
          { bold: 'Error boundary', text: 'RPG-styled crash screen with retry button and cycling emoji' },
          { bold: 'Semantic dedup guard', text: 'Water cooler echo loops permanently killed' },
        ],
      },
      {
        icon: '📊',
        title: 'Analytics & Growth',
        items: [
          { bold: 'Retention analytics', text: 'Cohort tracking, onboarding funnel, UTM attribution' },
          { bold: 'Affiliate program', text: '30% recurring commission at /affiliate' },
          { bold: 'Live session feed', text: 'Click any agent to see real-time tool calls and reasoning' },
        ],
      },
      {
        icon: '🎭',
        title: 'Demo & Onboarding',
        items: [
          { bold: 'Demo intro sequence', text: 'Guided tour for first-time visitors' },
          { bold: 'Observation-driven debugging', text: 'New positioning: see behavior first, explanation reveals itself' },
        ],
      },
    ],
  },
  {
    version: 'v0.1.0',
    date: 'Feb 21–26, 2026',
    tagline: 'The Beginning',
    sections: [
      {
        icon: '🏢',
        title: 'Core Office',
        items: [
          { bold: 'Work Room & Lounge', text: 'Agents split by status (working vs idle)' },
          { bold: 'Meeting Room', text: 'Agents discuss topics and reach consensus' },
          { bold: 'NPC pixel art', text: 'Animated agents with personality, moods, and colors' },
          { bold: 'Day/night cycle', text: 'Office lighting changes with real time' },
          { bold: 'NPCParticles', text: 'Floating symbols around working agents' },
        ],
      },
      {
        icon: '💬',
        title: 'Social',
        items: [
          { bold: 'Water Cooler', text: 'AI-generated conversations between idle agents' },
          { bold: 'Chat bubbles', text: 'Speech bubbles appear above NPCs' },
          { bold: 'DMs', text: 'Click any agent to send a direct message' },
          { bold: 'Office Events', text: 'Random ambient events ("coffee machine broke")' },
        ],
      },
      {
        icon: '🎮',
        title: 'Gamification',
        items: [
          { bold: 'XP & Levels', text: 'COMMON → UNCOMMON → RARE → EPIC → LEGENDARY' },
          { bold: 'Quest Log', text: 'Decisions waiting for your approval (RPG-style)' },
          { bold: 'Leaderboard', text: 'Agent rankings by XP' },
          { bold: 'Trading Cards', text: 'Pokemon-style shareable agent cards' },
          { bold: 'Accomplishments', text: 'Feed with auto-captured screen recordings' },
        ],
      },
      {
        icon: '🎵',
        title: 'Audio & Vibes',
        items: [
          { bold: 'Chiptune music', text: 'Procedural 8-bit soundtrack via Web Audio API' },
          { bold: 'Retro SFX', text: 'Click, open, close, level-up, celebration sounds' },
          { bold: 'Command Palette', text: 'Ctrl+K for power users' },
          { bold: 'Konami Code', text: 'Easter egg 👀' },
        ],
      },
      {
        icon: '⚙️',
        title: 'Auto-Work System',
        items: [
          { bold: 'Configurable intervals', text: '1m to 1h per agent' },
          { bold: 'Custom directives', text: 'Tell each agent what to focus on' },
          { bold: 'NOW button', text: 'Send agent to work immediately' },
        ],
      },
      {
        icon: '🚀',
        title: 'Setup & Install',
        items: [
          { bold: 'One-line installer', text: 'curl | bash — up and running in 60 seconds' },
          { bold: 'First-run seed data', text: 'Welcome conversation, tutorial quest, starter accomplishment' },
          { bold: 'Auto token generation', text: 'Secure auth with zero config' },
        ],
      },
      {
        icon: '🔒',
        title: 'Security',
        items: [
          { bold: 'Token-based auth', text: 'All API calls require authentication' },
          { bold: 'No telemetry', text: 'Zero tracking, zero data collection, 100% local' },
          { bold: 'CodeQL scanning', text: 'Automated security analysis' },
        ],
      },
    ],
  },
];

function TypewriterTitle({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState('');
  
  useEffect(() => {
    let i = 0;
    setDisplayed('');
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, 60);
    return () => clearInterval(id);
  }, [text]);
  
  return <>{displayed}<span style={{ opacity: displayed.length < text.length ? 1 : 0 }}>▊</span></>;
}

export default function ChangelogPage() {
  const [expandedVersion, setExpandedVersion] = useState<string>(RELEASES[0]?.version || '');
  
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0e14',
      color: '#00ff41',
      fontFamily: '"Press Start 2P", monospace',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Scanlines */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'repeating-linear-gradient(0deg, rgba(0,255,65,0.03) 0px, transparent 1px, transparent 2px, rgba(0,255,65,0.03) 3px)',
        pointerEvents: 'none',
        zIndex: 1,
      }} />
      
      {/* Header */}
      <div style={{
        padding: '40px 20px 20px',
        textAlign: 'center',
        position: 'relative',
        zIndex: 2,
      }}>
        <Link href="/" style={{
          color: '#00ff41',
          opacity: 0.5,
          textDecoration: 'none',
          fontSize: 9,
          letterSpacing: 2,
          display: 'inline-block',
          marginBottom: 24,
        }}>
          ← BACK TO OFFICE
        </Link>
        
        <h1 style={{
          fontSize: 20,
          letterSpacing: 4,
          marginBottom: 8,
          textShadow: '0 0 20px rgba(0,255,65,0.5)',
        }}>
          <TypewriterTitle text="PATCH NOTES" />
        </h1>
        
        <p style={{
          fontSize: 8,
          opacity: 0.4,
          letterSpacing: 3,
        }}>
          OPENCLAWFICE DEVELOPMENT LOG
        </p>
      </div>
      
      {/* Releases */}
      <div style={{
        maxWidth: 700,
        margin: '0 auto',
        padding: '20px 20px 60px',
        position: 'relative',
        zIndex: 2,
      }}>
        {RELEASES.map((release) => {
          const isExpanded = expandedVersion === release.version;
          
          return (
            <div key={release.version} style={{ marginBottom: 24 }}>
              {/* Version Header */}
              <button
                onClick={() => setExpandedVersion(isExpanded ? '' : release.version)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  padding: '16px 20px',
                  background: isExpanded ? 'rgba(0,255,65,0.08)' : 'rgba(0,255,65,0.03)',
                  border: `2px solid ${isExpanded ? '#00ff41' : 'rgba(0,255,65,0.2)'}`,
                  borderRadius: 4,
                  color: '#00ff41',
                  cursor: 'pointer',
                  fontFamily: '"Press Start 2P", monospace',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                }}
              >
                <span style={{ fontSize: 9, opacity: 0.6 }}>
                  {isExpanded ? '▼' : '▶'}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: 13,
                    marginBottom: 4,
                    textShadow: isExpanded ? '0 0 10px rgba(0,255,65,0.5)' : 'none',
                  }}>
                    {release.version}
                  </div>
                  <div style={{
                    fontSize: 8,
                    opacity: 0.5,
                  }}>
                    {release.date} — {release.tagline}
                  </div>
                </div>
                <div style={{
                  fontSize: 8,
                  opacity: 0.3,
                  letterSpacing: 1,
                }}>
                  {release.sections.reduce((acc, s) => acc + s.items.length, 0)} CHANGES
                </div>
              </button>
              
              {/* Sections */}
              {isExpanded && (
                <div style={{
                  borderLeft: '2px solid rgba(0,255,65,0.2)',
                  marginLeft: 20,
                  paddingLeft: 20,
                  paddingTop: 16,
                }}>
                  {release.sections.map((section) => (
                    <div key={section.title} style={{ marginBottom: 20 }}>
                      <div style={{
                        fontSize: 10,
                        marginBottom: 10,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                      }}>
                        <span>{section.icon}</span>
                        <span style={{ textShadow: '0 0 8px rgba(0,255,65,0.3)' }}>
                          {section.title}
                        </span>
                      </div>
                      
                      {section.items.map((item, i) => (
                        <div key={i} style={{
                          fontSize: 9,
                          lineHeight: 2,
                          paddingLeft: 16,
                          color: 'rgba(0,255,65,0.7)',
                          display: 'flex',
                          gap: 6,
                        }}>
                          <span style={{ opacity: 0.4 }}>+</span>
                          <span>
                            {item.bold && (
                              <span style={{ color: '#00ff41', fontWeight: 'bold' }}>
                                {item.bold}
                              </span>
                            )}
                            {item.bold && ' — '}
                            {item.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Footer */}
      <div style={{
        textAlign: 'center',
        padding: '20px',
        fontSize: 8,
        opacity: 0.25,
        letterSpacing: 3,
        position: 'relative',
        zIndex: 2,
      }}>
        BUILT BY AGENTS · FOR AGENTS
      </div>
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
      `}</style>
    </div>
  );
}
