import { MainLayout } from "@/components/layout/main-layout";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession();
  if (!session) redirect("/auth/login");

  return (
    <MainLayout>
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        {/* Sadržaj dashboarda */}
      </div>
    </MainLayout>
  );
}
