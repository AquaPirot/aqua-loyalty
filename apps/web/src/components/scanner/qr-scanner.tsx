'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Camera, X } from 'lucide-react';

export const QRScanner = ({ onScan }: { onScan: (data: string) => void }) => {
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const scannerRef = useRef(null);

  const initializeScanner = async () => {
    try {
      const devices = await Html5Qrcode.getCameras();
      if (devices && devices.length) {
        const scanner = new Html5Qrcode('reader');
        scannerRef.current = scanner;
        
        await scanner.start(
          { facingMode: 'environment' },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 }
          },
          (decodedText) => {
            onScan(decodedText);
            stopScanner();
          },
          (error) => console.log(error)
        );
        
        setScanning(true);
        setError('');
      } else {
        setError('Nije pronađena kamera na uređaju');
      }
    } catch (err) {
      setError('Greška pri pristupu kameri. Molimo dozvolite pristup kameri.');
    }
  };

  const stopScanner = async () => {
    if (scannerRef.current) {
      await scannerRef.current.stop();
      setScanning(false);
    }
  };

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop();
      }
    };
  }, []);

  return (
    <div className="w-full max-w-md mx-auto p-4 space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        <div id="reader" className="w-full aspect-square rounded-lg overflow-hidden bg-gray-100" />
        
        {!scanning ? (
          <Button onClick={initializeScanner} className="w-full">
            <Camera className="mr-2 h-4 w-4" />
            Pokreni skener
          </Button>
        ) : (
          <Button onClick={stopScanner} variant="destructive" className="w-full">
            <X className="mr-2 h-4 w-4" />
            Zaustavi skener
          </Button>
        )}
      </div>
    </div>
  );
};
