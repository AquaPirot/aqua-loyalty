'use client';

import { RewardCard } from '@/components/rewards/reward-card';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  const currentPoints = 15;
  const rewards = [
    { name: 'Besplatna kafa', points: 10 },
    { name: '10% Popusta', points: 25 },
    { name: 'Besplatan desert', points: 30 },
    { name: '20% Popusta', points: 50 },

  ];

  const handleRedeem = (name: string) => {
    alert(`Iskorišćena nagrada: ${name}`);
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center mb-2">Moji Bodovi</h1>
      <div className="bg-white rounded-lg p-6 shadow-md mb-6">
        <div className="text-4xl font-bold text-center text-blue-600">
          {currentPoints}
        </div>
      </div>
      
      <Button className="w-full mb-6">
        Skeniraj Račun
      </Button>

      <h2 className="text-xl font-bold mb-4">Dostupne Nagrade</h2>
      <div className="space-y-4">
        {rewards.map((reward) => (
          <RewardCard
            key={reward.name}
            name={reward.name}
            points={reward.points}
            isAvailable={currentPoints >= reward.points}
            onRedeem={() => handleRedeem(reward.name)}
          />
        ))}
      </div>
    </div>
  );
}
