import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.json();
    
    const restaurant = await prisma.restaurant.create({
      data: {
        name: data.name,
        pib: data.pib,
        address: data.address,
        pointsRatio: data.pointsRatio
      }
    });
    
    return NextResponse.json(restaurant);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create restaurant' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const restaurants = await prisma.restaurant.findMany();
    return NextResponse.json(restaurants);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch restaurants' }, { status: 500 });
  }
}
