'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { api } from '@/lib/api'
import { AddRewardModal } from '@/components/rewards/add-reward-modal'

export default function RewardsPage() {
  const [showAddModal, setShowAddModal] = useState(false)
  const queryClient = useQueryClient()

  const { data: rewards } = useQuery({
    queryKey: ['rewards'],
    queryFn: () => api.admin.getRewards(),
  })

  const updateReward = useMutation({
    mutationFn: api.admin.updateReward,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rewards'] })
    },
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Nagrade</h1>
        <Button onClick={() => setShowAddModal(true)}>
          Dodaj nagradu
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rewards?.map((reward) => (
          <Card key={reward.id}>
            <div className="p-6">
              <h3 className="font-medium">{reward.name}</h3>
              <p className="mt-1 text-sm text-gray-500">
                {reward.description}
              </p>
              <div className="mt-4 flex justify-between items-center">
                <span className="font-medium">
                  {reward.pointsRequired} bodova
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateReward.mutate({
                    id: reward.id,
                    active: !reward.active,
                  })}
                >
                  {reward.active ? 'Deaktiviraj' : 'Aktiviraj'}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <AddRewardModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </div>
  )
}
