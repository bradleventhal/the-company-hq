import { NextRequest, NextResponse } from 'next/server';
import { getAffiliateByRef, getReferralsForAffiliate, calculateEarnings } from '../../../../lib/affiliates';

/**
 * GET /api/affiliate/dashboard?ref=creator-name
 * 
 * Returns affiliate stats: clicks, conversions, earnings.
 * No auth required — stats are identified by ref code (public but not sensitive).
 */
export async function GET(req: NextRequest) {
  const ref = req.nextUrl.searchParams.get('ref');

  if (!ref) {
    return NextResponse.json({ error: 'Missing ref parameter' }, { status: 400 });
  }

  const affiliate = getAffiliateByRef(ref);
  if (!affiliate) {
    return NextResponse.json({ error: 'Affiliate not found' }, { status: 404 });
  }

  const referrals = getReferralsForAffiliate(ref);
  const earnings = calculateEarnings(ref);

  // Build daily click chart (last 30 days)
  const now = Date.now();
  const thirtyDaysAgo = now - (30 * 24 * 60 * 60 * 1000);
  const dailyClicks: Record<string, number> = {};

  for (let i = 0; i < 30; i++) {
    const date = new Date(now - i * 24 * 60 * 60 * 1000);
    dailyClicks[date.toISOString().split('T')[0]] = 0;
  }

  for (const r of referrals) {
    if (r.timestamp > thirtyDaysAgo) {
      const date = new Date(r.timestamp).toISOString().split('T')[0];
      if (dailyClicks[date] !== undefined) {
        dailyClicks[date]++;
      }
    }
  }

  // Recent referrals (last 20)
  const recentReferrals = referrals
    .slice(-20)
    .reverse()
    .map(r => ({
      date: new Date(r.timestamp).toISOString(),
      page: r.page,
      converted: r.converted,
      plan: r.plan,
    }));

  return NextResponse.json({
    affiliate: {
      name: affiliate.name,
      refCode: affiliate.refCode,
      referralLink: `https://openclawfice.com?ref=${affiliate.refCode}`,
      joinedAt: new Date(affiliate.createdAt).toISOString(),
    },
    stats: earnings,
    dailyClicks,
    recentReferrals,
    commissionRate: 0.30,
    proPrice: 9,
  });
}
