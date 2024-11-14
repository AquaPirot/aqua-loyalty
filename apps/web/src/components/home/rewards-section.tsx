'use client'

import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { useAuth } from '@/hooks/use-auth'

export function RewardsSection() {
  const { user } = useAuth()
  const { data: rewards, isLoading } = useQuery({
    queryKey: ['rewards'],
    queryFn: () => api.rewards.getAll(),
  })

  if (isLoading) return <div>Učitavanje...</div>
  if (!rewards) return null

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900">Dostupne nagrade</h2>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rewards.map((reward) => (
          <div
            key={reward.id}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <h3 className="text-lg font-medium text-gray-900">
              {reward.name}
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              {reward.description}
            </p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-blue-600 font-medium">
                {reward.pointsRequired} bodova
              </span>
              <button
                disabled={!user || user.points < reward.pointsRequired}
                className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => api.rewards.redeem(reward.id)}
              >
                Iskoristi
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
