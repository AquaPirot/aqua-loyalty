import { AdminProvider } from '@/components/providers'
import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminProvider>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6 bg-gray-100">
            {children}
          </main>
        </div>
      </div>
    </AdminProvider>
  )
}
