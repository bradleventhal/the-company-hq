import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    theme: 'dark',
    companyName: 'The Company',
    sfxEnabled: false,
    musicEnabled: false,
  });
}
