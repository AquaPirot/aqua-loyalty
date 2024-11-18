// src/app/admin/rewards/page.tsx
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";

export default async function RewardsPage() {
  const rewards = await prisma.reward.findMany({
    include: { restaurant: true }
  });

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Nagrade</h1>
        <Button>Nova Nagrada</Button>
      </div>
      
      <div className="grid gap-4">
        {rewards.map((reward) => (
          <div key={reward.id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-bold">{reward.name}</h3>
            <p className="text-sm text-gray-600">{reward.pointsCost} bodova</p>
            <p className="text-sm text-gray-600">{reward.restaurant.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
