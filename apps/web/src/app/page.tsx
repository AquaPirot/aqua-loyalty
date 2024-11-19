'use client';

import { useRouter } from 'next/navigation';
import { useUserStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { RewardCard } from '@/components/rewards/reward-card';
import { useEffect } from 'react';

const rewards = [
  { name: 'Besplatna kafa', points: 10 },
  { name: '10% Popusta', points: 25 },
  { name: 'Besplatan desert', points: 30 },
  { name: '20% Popusta', points: 50 }
];

export default function HomePage() {
  const router = useRouter();
  const { points, setPoints, subtractPoints } = useUserStore();

  // Učitaj bodove korisnika pri prvom renderovanju
  useEffect(() => {
    const fetchUserPoints = async () => {
      try {
        const response = await fetch('/api/user/points');
        if (response.ok) {
          const data = await response.json();
          setPoints(data.points);
        }
      } catch (error) {
        console.error('Error fetching points:', error);
      }
    };

    fetchUserPoints();
  }, [setPoints]);

  const handleScanClick = () => {
    router.push('/scan');
  };

  const handleRedeem = async (reward: { name: string; points: number }) => {
    try {
      const response = await fetch('/api/rewards/redeem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rewardName: reward.name,
          pointsCost: reward.points
        }),
      });

      if (response.ok) {
        subtractPoints(reward.points);
        alert(`Uspešno ste iskoristili nagradu: ${reward.name}`);
      } else {
        const error = await response.json();
        alert(error.message || 'Došlo je do greške');
      }
    } catch (error) {
      console.error('Error redeeming reward:', error);
      alert('Došlo je do greške prilikom korišćenja nagrade');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center mb-2">Moji Bodovi</h1>
      <div className="bg-white rounded-lg p-6 shadow-md mb-6">
        <div className="text-4xl font-bold text-center text-blue-600">
          {points}
        </div>
      </div>
      
      <Button onClick={handleScanClick} className="w-full mb-6">
        Skeniraj Račun
      </Button>

      <h2 className="text-xl font-bold mb-4">Dostupne Nagrade</h2>
      <div className="space-y-4">
        {rewards.map((reward) => (
          <RewardCard
            key={reward.name}
            name={reward.name}
            points={reward.points}
            isAvailable={points >= reward.points}
            onRedeem={() => handleRedeem(reward)}
          />
        ))}
      </div>
    </div>
  );
}
