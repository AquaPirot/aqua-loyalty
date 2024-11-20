import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { qrData } = await req.json();

    // QR Format: "RESTO-{PIB}-{IZNOS}-{DATUM}"
    const parts = qrData.split('-');
    if (parts[0] !== 'RESTO' || !parts[2]) {
      return NextResponse.json({ error: 'Invalid QR format' }, { status: 400 });
    }

    const amount = parseFloat(parts[2]);
    if (isNaN(amount)) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    // Bodovi: 1 bod na svakih 200 dinara
    const pointsEarned = Math.floor(amount / 200);

    // Update user points
    await prisma.user.update({
      where: { email: session.user.email },
      data: {
        points: {
          increment: pointsEarned
        }
      }
    });

    return NextResponse.json({ pointsEarned });
  } catch {
    return NextResponse.json(
      { error: 'Error processing receipt' },
      { status: 500 }
    );
  }
}
