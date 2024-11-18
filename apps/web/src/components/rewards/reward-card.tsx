'use client';
interface RewardCardProps {
  name: string;
  points: number;
  isAvailable: boolean;
  onRedeem: () => void;
}

export function RewardCard({ name, points, isAvailable, onRedeem }: RewardCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="font-bold">{name}</h3>
      <p className="text-sm text-gray-600">{points} bodova</p>
      <button
        onClick={onRedeem}
        disabled={!isAvailable}
        className={`mt-2 px-4 py-2 rounded ${
          isAvailable ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
        }`}
      >
        {isAvailable ? 'Iskoristi' : 'Nedovoljno bodova'}
      </button>
    </div>
  );
}
