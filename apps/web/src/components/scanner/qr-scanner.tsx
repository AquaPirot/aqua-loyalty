'use client';

import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect, useState } from 'react';

export function QRScanner({ onScan }: { onScan: (data: string) => void }) {
  useEffect(() => {
    const qrScanner = new Html5QrcodeScanner(
      'reader',
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false
    );

    qrScanner.render(
      (decodedText) => {
        onScan(decodedText);
        qrScanner.clear();
      },
      (errorMessage) => {
        console.log(errorMessage);
      }
    );

    return () => {
      qrScanner.clear();
    };
  }, [onScan]);

  return <div id="reader" className="w-full max-w-md mx-auto" />;
}
