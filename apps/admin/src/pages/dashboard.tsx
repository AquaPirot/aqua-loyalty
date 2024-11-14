'use client'

import { useQuery } from '@tanstack/react-query'
import { Card } from '@/components/ui/card'
import { api } from '@/lib/api'

export default function DashboardPage() {
 const { data: stats } = useQuery({
   queryKey: ['dashboard-stats'],
   queryFn: () => api.admin.getStats(),
 })

 return (
   <div className="space-y-6">
     <h1 className="text-2xl font-bold">Dashboard</h1>

     <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
       <Card>
         <div className="p-6">
           <h3 className="text-sm font-medium text-gray-500">
             Ukupno korisnika
           </h3>
           <p className="mt-2 text-3xl font-bold">{stats?.totalUsers || 0}</p>
         </div>
       </Card>

       <Card>
         <div className="p-6">
           <h3 className="text-sm font-medium text-gray-500">
             Skeniranih računa
           </h3>
           <p className="mt-2 text-3xl font-bold">{stats?.totalReceipts || 0}</p>
         </div>
       </Card>

       <Card>
         <div className="p-6">
           <h3 className="text-sm font-medium text-gray-500">
             Dodeljeno bodova
           </h3>
           <p className="mt-2 text-3xl font-bold">{stats?.totalPoints || 0}</p>
         </div>
       </Card>

       <Card>
         <div className="p-6">
           <h3 className="text-sm font-medium text-gray-500">
             Iskorišćenih nagrada
           </h3>
           <p className="mt-2 text-3xl font-bold">{stats?.totalRedemptions || 0}</p>
         </div>
       </Card>
     </div>

     {/* Grafici i dodatne statistike */}
   </div>
 )
}
