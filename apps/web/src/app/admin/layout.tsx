// src/app/admin/layout.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  
  // Provjera admin pristupa (dodati logiku)
  if (!session?.user?.email) redirect("/auth/login");

  return (
    <div className="flex min-h-screen">
      <nav className="w-64 bg-gray-800 text-white p-4">
        <h1 className="text-xl font-bold mb-8">Admin Panel</h1>
        {/* Admin navigacija */}
      </nav>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
