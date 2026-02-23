'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Demo Mode Page — Redirects to main page with demo=true query param
 */
export default function DemoPage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/?demo=true');
  }, [router]);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      background: '#0f172a',
      color: '#e2e8f0',
      fontFamily: 'system-ui',
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🎮</div>
        <div style={{ fontSize: 20, marginBottom: 8 }}>Loading Demo...</div>
        <div style={{ fontSize: 14, color: '#64748b' }}>
          See OpenClawfice in action
        </div>
      </div>
    </div>
  );
}
