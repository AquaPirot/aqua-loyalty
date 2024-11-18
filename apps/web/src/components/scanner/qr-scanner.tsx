'use client';

import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

interface ScannerProps {
  onScan: (data: string, restaurantId: string) => Promise<void>;
  restaurantId: string;
}

export function QRScanner({ onScan, restaurantId }: ScannerProps) {
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    if (!scanning) return;

    const qrScanner = new Html5QrcodeScanner(
      'reader',
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false
    );

    qrScanner.render(
      async (decodedText) => {
        try {
          await onScan(decodedText, restaurantId);
          qrScanner.clear();
          setScanning(false);
        } catch (error) {
          console.error('Scanning failed:', error);
        }
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      qrScanner.clear();
    };
  }, [scanning, onScan, restaurantId]);

  return (
    <div className="w-full max-w-md mx-auto">
      {!scanning ? (
        <Button 
          onClick={() => setScanning(true)}
          className="w-full"
        >
          Skeniraj Račun
        </Button>
      ) : (
        <div className="space-y-4">
          <div id="reader" className="border rounded-lg overflow-hidden" />
          <Button 
            onClick={() => setScanning(false)}
            variant="outline"
            className="w-full"
          >
            Otkaži
          </Button>
        </div>
      )}
    </div>
  );
}
