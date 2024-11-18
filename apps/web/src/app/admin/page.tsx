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
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-gray-500">Ukupno korisnika</h2>
          <p className="text-3xl font-bold">{stats[0]}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-gray-500">Ukupno računa</h2>
          <p className="text-3xl font-bold">{stats[1]}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-gray-500">Ukupno bodova</h2>
          <p className="text-3xl font-bold">{stats[2]._sum.points || 0}</p>
        </div>
      </div>
    </div>
  );
}
