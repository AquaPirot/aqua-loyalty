'use client';

import { useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

interface QRScannerProps {
  onScan: (data: string) => void;
}

export function QRScanner({ onScan }: QRScannerProps) {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      'reader',
      {
        qrbox: {
          width: 250,
          height: 250,
        },
        fps: 10,
      },
      false
    );

    scanner.render(
      (decodedText) => {
        onScan(decodedText);
        scanner.clear();
      },
      (error) => {
        console.error(error);
      }
    );

    return () => {
      scanner.clear();
    };
  }, [onScan]);

  return (
    <div>
      <div id="reader" className="mx-auto"></div>
      <p className="text-center mt-4 text-sm text-gray-600">
        Postavite QR kod u okvir
      </p>
    </div>
  );
}
