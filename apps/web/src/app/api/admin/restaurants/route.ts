// src/app/api/admin/restaurants/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const data = await req.json();
  
  const restaurant = await prisma.restaurant.create({
    data: {
      name: data.name,
      pib: data.pib,
      address: data.address,
      pointsRatio: data.pointsRatio || 200
    }
  });
  
  return NextResponse.json(restaurant);
}
