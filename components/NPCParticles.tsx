'use client';

import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  char: string;
  color: string;
  size: number;
}

interface NPCParticlesProps {
  agentStatus: 'working' | 'idle';
  agentRole?: string;
  width: number;
  height: number;
}

/**
 * Animated particles that float around working NPCs.
 * Different particle types based on agent role:
 * - Developers: Code symbols (< > / { })
 * - Analysts: Data symbols (0 1 Σ ∞)
 * - Creatives: Design symbols (✦ ◆ ● ★)
 * - Default: Generic work symbols (• … —)
 */
export function NPCParticles({ agentStatus, agentRole, width, height }: NPCParticlesProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Only show particles when working
    if (agentStatus !== 'working') {
      setParticles([]);
      return;
    }

    // Particle symbol sets by role
    const getParticleChars = (role?: string): string[] => {
      const roleLower = role?.toLowerCase() || '';
      
      if (roleLower.includes('dev') || roleLower.includes('engineer') || roleLower.includes('code')) {
        return ['<', '>', '/', '{', '}', '[', ']', '(', ')'];
      }
      
      if (roleLower.includes('data') || roleLower.includes('analyst') || roleLower.includes('research')) {
        return ['0', '1', 'Σ', '∞', 'π', '∫', '√', '±'];
      }
      
      if (roleLower.includes('design') || roleLower.includes('creative') || roleLower.includes('art')) {
        return ['✦', '◆', '●', '★', '◇', '○', '☆', '♦'];
      }
      
      if (roleLower.includes('ops') || roleLower.includes('devops') || roleLower.includes('infra')) {
        return ['⚙', '⚡', '⬆', '⬇', '→', '←', '⟲', '⚠'];
      }
      
      // Default: generic work symbols
      return ['•', '…', '—', '·', '‧', '∙', '‒', '−'];
    };

    const particleChars = getParticleChars(agentRole);
    const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

    let particleId = 0;
    const createParticle = (): Particle => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.3 + Math.random() * 0.5;
      
      return {
        id: particleId++,
        x: width / 2 + (Math.random() - 0.5) * width * 0.6,
        y: height / 2 + (Math.random() - 0.5) * height * 0.4,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.3, // Slight upward bias
        life: 0,
        maxLife: 60 + Math.random() * 60, // 1-2 seconds at 60fps
        char: particleChars[Math.floor(Math.random() * particleChars.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 8 + Math.random() * 4,
      };
    };

    // Spawn initial particles
    const initialParticles: Particle[] = [];
    for (let i = 0; i < 8; i++) {
      initialParticles.push(createParticle());
    }
    setParticles(initialParticles);

    // Animation loop
    const animate = () => {
      setParticles(prev => {
        // Update existing particles
        let updated = prev.map(p => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          life: p.life + 1,
        }));

        // Remove dead particles
        updated = updated.filter(p => p.life < p.maxLife);

        // Spawn new particle occasionally (every ~20 frames = 3/sec)
        if (Math.random() < 0.15 && updated.length < 12) {
          updated.push(createParticle());
        }

        return updated;
      });
    };

    const interval = setInterval(animate, 1000 / 60); // 60fps
    return () => clearInterval(interval);
  }, [agentStatus, agentRole, width, height]);

  if (agentStatus !== 'working' || particles.length === 0) {
    return null;
  }

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {particles.map(p => {
        const opacity = 1 - (p.life / p.maxLife);
        const scale = 0.5 + (1 - p.life / p.maxLife) * 0.5;
        
        return (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              left: p.x,
              top: p.y,
              fontSize: p.size,
              color: p.color,
              opacity: opacity * 0.6,
              transform: `translate(-50%, -50%) scale(${scale})`,
              fontFamily: '"Press Start 2P", monospace',
              textShadow: `0 0 ${p.size * 0.5}px ${p.color}`,
              transition: 'none',
            }}
          >
            {p.char}
          </div>
        );
      })}
    </div>
  );
}
