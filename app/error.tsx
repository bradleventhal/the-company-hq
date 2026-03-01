'use client';

import { useEffect, useState } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [showCursor, setShowCursor] = useState(true);
  const [frame, setFrame] = useState(0);
  
  useEffect(() => {
    console.error('OpenClawfice error:', error);
  }, [error]);
  
  useEffect(() => {
    const id = setInterval(() => setShowCursor((c) => !c), 530);
    return () => clearInterval(id);
  }, []);
  
  useEffect(() => {
    const id = setInterval(() => setFrame((f) => f + 1), 2000);
    return () => clearInterval(id);
  }, []);
  
  const faces = ['💀', '🤖', '⚡', '🔧'];
  
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      background: '#0a0e14',
      color: '#ff4040',
      fontFamily: '"Press Start 2P", monospace',
      textAlign: 'center',
      padding: 20,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Scanlines */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'repeating-linear-gradient(0deg, rgba(255,64,64,0.03) 0px, transparent 1px, transparent 2px, rgba(255,64,64,0.03) 3px)',
        pointerEvents: 'none',
      }} />
      
      {/* CRT vignette */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)',
        pointerEvents: 'none',
      }} />
      
      <div style={{
        fontSize: 64,
        marginBottom: 24,
        filter: 'drop-shadow(0 0 20px rgba(255,64,64,0.4))',
        animation: 'npcBob 2s ease-in-out infinite',
      }}>
        {faces[frame % faces.length]}
      </div>
      
      <div style={{
        fontSize: 14,
        letterSpacing: 4,
        marginBottom: 8,
        textShadow: '0 0 15px rgba(255,64,64,0.8)',
      }}>
        SYSTEM ERROR
      </div>
      
      <div style={{
        fontSize: 9,
        opacity: 0.5,
        letterSpacing: 3,
        marginBottom: 32,
        textTransform: 'uppercase',
      }}>
        An agent encountered a runtime exception
      </div>
      
      {/* Error dialogue box */}
      <div style={{
        border: '3px solid #ff4040',
        borderRadius: 4,
        padding: '20px 28px',
        maxWidth: 500,
        width: '90%',
        background: 'rgba(40,0,0,0.8)',
        boxShadow: '0 0 30px rgba(255,64,64,0.1), inset 0 0 30px rgba(255,64,64,0.05)',
      }}>
        <p style={{
          fontSize: 10,
          lineHeight: 2,
          margin: 0,
          textAlign: 'left',
          color: '#ff8080',
          wordBreak: 'break-word',
        }}>
          &gt; {error.message || 'Unknown error occurred'}
          <span style={{ opacity: showCursor ? 1 : 0 }}>▊</span>
        </p>
        {error.digest && (
          <p style={{
            fontSize: 8,
            marginTop: 12,
            marginBottom: 0,
            opacity: 0.4,
            color: '#ff8080',
          }}>
            digest: {error.digest}
          </p>
        )}
      </div>
      
      {/* Actions */}
      <div style={{
        marginTop: 24,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        alignItems: 'center',
      }}>
        <button
          onClick={reset}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            color: '#ff4040',
            fontSize: 11,
            padding: '8px 20px',
            border: '2px solid #ff4040',
            borderRadius: 2,
            background: 'rgba(255,64,64,0.05)',
            cursor: 'pointer',
            letterSpacing: 1,
            fontFamily: '"Press Start 2P", monospace',
            transition: 'background 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,64,64,0.15)';
            e.currentTarget.style.boxShadow = '0 0 15px rgba(255,64,64,0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,64,64,0.05)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <span style={{ fontSize: 9 }}>▶</span>
          Retry
        </button>
        
        <a
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            color: '#ff4040',
            textDecoration: 'none',
            fontSize: 11,
            padding: '8px 20px',
            border: '2px solid rgba(255,64,64,0.3)',
            borderRadius: 2,
            background: 'transparent',
            cursor: 'pointer',
            letterSpacing: 1,
            opacity: 0.7,
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.7'; }}
        >
          <span style={{ fontSize: 9 }}>▶</span>
          Return to Office
        </a>
      </div>
      
      <div style={{
        position: 'absolute',
        bottom: 20,
        fontSize: 8,
        opacity: 0.25,
        letterSpacing: 3,
      }}>
        EXCEPTION HANDLER · OPENCLAWFICE v1
      </div>
      
      <style>{`
        @keyframes npcBob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
}
