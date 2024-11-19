'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/lib/store';
import { QRScanner } from '@/components/scanner/qr-scanner';

export default function ScanPage() {
  const router = useRouter();
  const { addPoints } = useUserStore();
  const [scanning, setScanning] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleScan = async (data: string) => {
    try {
      const response = await fetch('/api/scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ qrData: data }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Greška pri skeniranju');
      }

      addPoints(result.pointsEarned);
      setSuccess(true);
      setScanning(false);

      // Redirect nakon 2 sekunde
      setTimeout(() => {
        router.push('/');
      }, 2000);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Greška pri skeniranju');
      setTimeout(() => setError(null), 3000);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6">
          Skenirajte Račun
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            Uspešno ste skenirali račun! Preusmeravanje...
          </div>
        )}

        {scanning && <QRScanner onScan={handleScan} />}

        <button
          onClick={() => router.push('/')}
          className="w-full mt-4 p-2 bg-gray-200 rounded"
        >
          Otkaži
        </button>
      </div>
    </div>
  );
}
