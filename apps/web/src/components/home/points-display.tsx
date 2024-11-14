'use client'

import { useAuth } from '@/hooks/use-auth'

export function PointsDisplay() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
      <h2 className="text-xl font-semibold text-gray-900">Vaši bodovi</h2>
      <div className="mt-2 flex items-baseline">
        <span className="text-4xl font-bold text-blue-600">
          {user.points}
        </span>
        <span className="ml-2 text-gray-500">bodova</span>
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-500">
          Sakupljajte bodove skeniranjem računa i zamenite ih za nagrade
        </p>
      </div>
    </div>
  )
}
