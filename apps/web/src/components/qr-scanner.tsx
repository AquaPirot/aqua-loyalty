'use client'

import { useEffect, useRef } from 'react'
import { QrReader } from 'react-qr-reader'

interface QrScannerProps {
  onResult: (data: string) => void
  onClose: () => void
}

export function QrScanner({ onResult, onClose }: QrScannerProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-sm w-full overflow-hidden">
        <div className="p-4 border-b">
          <h3 className="text-lg font-medium">Skeniraj račun</h3>
        </div>

        <div className="aspect-square relative">
          <QrReader
            onResult={(result) => {
              if (result) {
                onResult(result.getText())
              }
            }}
            constraints={{ facingMode: 'environment' }}
          />
        </div>

        <div className="p-4">
          <button
            onClick={onClose}
            className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
          >
            Otkaži
          </button>
        </div>
      </div>
    </div>
  )
}
