import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { rewardId } = await req.json();

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    const reward = await prisma.reward.findUnique({
      where: { id: rewardId }
    });

    if (!user || !reward) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    if (user.points < reward.pointsCost) {
      return NextResponse.json({ error: 'Insufficient points' }, { status: 400 });
    }

    // Create redemption
    const redemption = await prisma.rewardRedemption.create({
      data: {
        userId: user.id,
        rewardId: reward.id,
        code: Math.random().toString(36).substring(7),
      }
    });

    // Update user points
    await prisma.user.update({
      where: { id: user.id },
      data: { points: user.points - reward.pointsCost }
    });

    return NextResponse.json(redemption);
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
