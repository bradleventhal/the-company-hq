import { NextRequest, NextResponse } from 'next/server';
import { readData, writeData, generateRefCode, getAffiliateByEmail } from '../../../../lib/affiliates';

/**
 * POST /api/affiliate/signup
 * 
 * Register as an affiliate. Returns a unique ref code.
 * Body: { name, email, twitter? }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, twitter } = body;

    // Validate
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json({ error: 'Name is required (min 2 chars)' }, { status: 400 });
    }
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }

    // Check if already registered
    const existing = getAffiliateByEmail(email);
    if (existing) {
      return NextResponse.json({
        ok: true,
        existing: true,
        affiliate: {
          refCode: existing.refCode,
          name: existing.name,
          referralLink: `https://openclawfice.com?ref=${existing.refCode}`,
        },
      });
    }

    // Create new affiliate
    const refCode = generateRefCode(name.trim());
    const data = readData();

    const affiliate = {
      id: `aff_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      refCode,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      twitter: twitter ? twitter.trim().replace(/^@/, '') : undefined,
      createdAt: Date.now(),
      status: 'active' as const,
    };

    data.affiliates.push(affiliate);
    const saved = writeData(data);

    if (!saved) {
      return NextResponse.json({ error: 'Failed to save — read-only filesystem' }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      existing: false,
      affiliate: {
        id: affiliate.id,
        refCode: affiliate.refCode,
        name: affiliate.name,
        referralLink: `https://openclawfice.com?ref=${affiliate.refCode}`,
        dashboardLink: `https://openclawfice.com/affiliate/dashboard?ref=${affiliate.refCode}`,
      },
    });
  } catch (err) {
    return NextResponse.json({ error: 'Signup failed' }, { status: 500 });
  }
}
