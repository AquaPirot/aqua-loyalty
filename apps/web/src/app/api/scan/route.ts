// src/app/api/scan/route.ts
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

export async function POST(req: Request) {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { qrData } = await req.json();
  const pointsPerDinar = 200; // 200 RSD = 1 point

  try {
    const receipt = await prisma.receipt.create({
      data: {
        qrData,
        amount: 1000, // Parse from QR
        points: Math.floor(1000 / pointsPerDinar),
        user: {
          connect: {
            email: session.user.email
          }
        }
      }
    });

    return NextResponse.json(receipt);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process receipt' }, { status: 500 });
  }
}
