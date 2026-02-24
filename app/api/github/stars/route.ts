import { NextResponse } from 'next/server';

export const runtime = 'edge';
export const revalidate = 300; // Cache for 5 minutes

/**
 * Fetch GitHub star count for openclawfice/openclawfice
 * Cached for 5 minutes to avoid rate limits
 */
export async function GET() {
  try {
    const res = await fetch('https://api.github.com/repos/openclawfice/openclawfice', {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'OpenClawfice-App',
      },
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      // Fallback to cached value or default
      return NextResponse.json({ stars: 42, cached: true });
    }

    const data = await res.json();
    return NextResponse.json({ 
      stars: data.stargazers_count || 0,
      cached: false,
    });
  } catch (err) {
    console.error('Failed to fetch GitHub stars:', err);
    // Return fallback
    return NextResponse.json({ stars: 42, cached: true, error: true });
  }
}
