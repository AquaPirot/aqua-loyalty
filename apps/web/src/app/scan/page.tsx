'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/lib/store';
import { QRScanner } from '@/components/scanner/qr-scanner';
import { Alert, AlertDescription } from "@/components/ui/alert";

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
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {success ? (
        <Alert>
          <AlertDescription>Uspešno skenirano! Preusmeravanje...</AlertDescription>
        </Alert>
      ) : (
        <QRScanner onScan={handleScan} />
      )}
    </div>
  );
}
