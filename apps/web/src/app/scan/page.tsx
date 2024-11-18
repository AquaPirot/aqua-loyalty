'use client';

import { QRScanner } from '@/components/scanner/qr-scanner';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ScanPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleScan = async (qrData: string, restaurantId: string) => {
    try {
      const response = await fetch('/api/scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          qrData,
          restaurantId
        }),
      });

      if (!response.ok) {
        throw new Error('Scanning failed');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/dashboard');
        router.refresh();
      }, 2000);
    } catch (err) {
      setError('Greška pri skeniranju računa');
      setTimeout(() => setError(null), 3000);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Skeniraj Račun</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Uspešno skeniran račun! Preusmeravanje...
        </div>
      )}

      <QRScanner 
        onScan={handleScan}
        restaurantId="default-restaurant-id" // Ovo ćemo kasnije dinamički postaviti
      />
    </div>
  );
}
