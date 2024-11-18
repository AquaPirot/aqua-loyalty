// src/app/admin/page.tsx
import { prisma } from "@/lib/prisma";

export default async function AdminPage() {
  const stats = await prisma.$transaction([
    prisma.user.count(),
    prisma.receipt.count(),
    prisma.receipt.aggregate({
      _sum: { points: true }
    })
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-3 gap-6">
        <StatsCard title="Korisnici" value={stats[0]} />
        <StatsCard title="Računi" value={stats[1]} />
        <StatsCard title="Ukupno Bodova" value={stats[2]._sum.points || 0} />
      </div>
    </div>
  );
}

function StatsCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}
