import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { qrData, restaurantId } = await req.json();
    const pointsPerDinar = 200;

    // Provera da li restoran postoji
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: restaurantId }
    });

    if (!restaurant) {
      return NextResponse.json({ error: 'Restaurant not found' }, { status: 404 });
    }

    const receipt = await prisma.receipt.create({
      data: {
        qrData,
        amount: 1000, // Ovo ćemo kasnije izvući iz QR koda
        points: Math.floor(1000 / pointsPerDinar),
        user: {
          connect: {
            email: session.user.email
          }
        },
        restaurant: {
          connect: {
            id: restaurantId
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
