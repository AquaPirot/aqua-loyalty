import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { rewardName, pointsCost } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    if (user.points < pointsCost) {
      return NextResponse.json({ message: 'Insufficient points' }, { status: 400 });
    }

    // Update user points
    await prisma.user.update({
      where: { id: user.id },
      data: { points: user.points - pointsCost }
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
