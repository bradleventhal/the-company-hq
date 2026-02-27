import { NextRequest, NextResponse } from 'next/server';
import { readData, writeData, getAffiliateByRef } from '../../../../lib/affiliates';

/**
 * POST /api/affiliate/track
 * 
 * Track a referral click or conversion.
 * Body: { type: 'click'|'conversion', ref, visitorId, page?, plan?, revenue? }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, ref, visitorId, page, plan, revenue } = body;

    if (!ref || !type) {
      return NextResponse.json({ error: 'Missing ref or type' }, { status: 400 });
    }

    // Verify the ref code exists
    const affiliate = getAffiliateByRef(ref);
    if (!affiliate) {
      return NextResponse.json({ ok: true, tracked: false, reason: 'unknown_ref' });
    }

    const data = readData();

    if (type === 'click') {
      // Check for duplicate clicks from same visitor (dedupe within 1 hour)
      const oneHourAgo = Date.now() - 3600000;
      const isDuplicate = data.referrals.some(
        r => r.affiliateRef === ref && r.visitorId === visitorId && r.timestamp > oneHourAgo
      );

      if (isDuplicate) {
        return NextResponse.json({ ok: true, tracked: false, reason: 'duplicate' });
      }

      data.referrals.push({
        id: `ref_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
        affiliateRef: ref,
        visitorId: visitorId || 'unknown',
        timestamp: Date.now(),
        page: page || '/',
        converted: false,
      });
    } else if (type === 'conversion') {
      // Find the referral and mark as converted
      const referral = data.referrals.find(
        r => r.affiliateRef === ref && r.visitorId === visitorId && !r.converted
      );

      if (referral) {
        referral.converted = true;
        referral.conversionDate = Date.now();
        referral.plan = plan || 'pro';
        referral.revenue = revenue || 9; // Default Pro price
      } else {
        // No matching click — create a direct conversion record
        data.referrals.push({
          id: `ref_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
          affiliateRef: ref,
          visitorId: visitorId || 'unknown',
          timestamp: Date.now(),
          page: '/upgrade',
          converted: true,
          conversionDate: Date.now(),
          plan: plan || 'pro',
          revenue: revenue || 9,
        });
      }
    }

    writeData(data);
    return NextResponse.json({ ok: true, tracked: true });
  } catch {
    return NextResponse.json({ error: 'Track failed' }, { status: 500 });
  }
}
