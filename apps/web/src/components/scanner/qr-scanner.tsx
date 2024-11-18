'use client';

import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect, useState } from 'react';

export function QRScanner({ onScan }: { onScan: (data: string) => void }) {
  const [scanner, setScanner] = useState<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    const qrScanner = new Html5QrcodeScanner(
      'reader',
      { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false
    );
    setScanner(qrScanner);
    qrScanner.render(success, error);

    return () => {
      qrScanner.clear();
    };
  }, []);

  const success = (decodedText: string) => {
    onScan(decodedText);
    scanner?.clear();
  };

  const error = (err: any) => {
    console.error(err);
  };

  return <div id="reader" className="w-full max-w-md mx-auto" />;
}
