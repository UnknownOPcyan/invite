// app/api/referrals/route.ts
import { getReferrals, getReferrer, saveReferral } from '@/lib/storage';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { userId, referrerId, name } = await request.json();

  if (!userId || !referrerId || !name) {
    return NextResponse.json({ error: 'Missing userId, referrerId, or name' }, { status: 400 });
  }

  await saveReferral(userId, referrerId, name);
  return NextResponse.json({ success: true });
}

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get('userId');
  
  if (!userId) {
    return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
  }

  const referrals = await getReferrals(userId);
  const referrer = await getReferrer(userId);

  return NextResponse.json({ referrals, referrer });
}
