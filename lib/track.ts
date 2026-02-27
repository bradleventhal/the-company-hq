/**
 * Lightweight event tracking for OpenClawfice.
 * Uses Vercel Analytics custom events (free tier: 2500 events/month).
 * Also sends to local /api/analytics when running on localhost.
 */
import { track as vercelTrack } from '@vercel/analytics';

type TrackEvent = 
  | 'demo_started'
  | 'npc_clicked'
  | 'quest_viewed'
  | 'install_copied'
  | 'cta_clicked'
  | 'card_viewed'
  | 'card_shared'
  | 'keyboard_shortcut'
  | 'konami_code'
  | 'demo_tour_started'
  | 'demo_tour_completed'
  | 'music_toggled'
  | 'meeting_started'
  | 'water_cooler_opened'
  | 'settings_opened';

export function track(event: TrackEvent, props?: Record<string, string | number | boolean>) {
  // Vercel Analytics (works on prod)
  try {
    vercelTrack(event, props);
  } catch {
    // Silent fail
  }

  // Also log to local analytics API (works on localhost)
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    try {
      const params = new URLSearchParams(window.location.search);
      fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page: window.location.pathname,
          utm_source: params.get('utm_source') || undefined,
          utm_campaign: params.get('utm_campaign') || undefined,
          event,
          ...props,
        }),
      }).catch(() => {});
    } catch {
      // Silent fail
    }
  }
}
