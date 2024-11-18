import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { qrData } = await req.json();
    const pointsPerDinar = 200;

    const receipt = await prisma.receipt.create({
      data: {
        qrData,
        amount: 1000,
        points: Math.floor(1000 / pointsPerDinar),
        user: {
          connect: {
            email: session.user.email
          }
        }
      }
    });

    return NextResponse.json(receipt);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
