'use client'

import { useState } from 'react'
import { Camera } from 'lucide-react'
import { QrScanner } from '@/components/qr-scanner'
import { api } from '@/lib/api'
import { useAuth } from '@/hooks/use-auth'

export function ScanButton() {
 const [isScanning, setIsScanning] = useState(false)
 const { user } = useAuth()

 const handleScan = async (data: string) => {
   try {
     const result = await api.receipts.scan({ qrData: data })
     // Handle successful scan
     setIsScanning(false)
     window.location.reload() // Update points
   } catch (error) {
     console.error('Scan failed:', error)
     // Show error message
   }
 }

 if (!user) return null

 return (
   <>
     <button
       onClick={() => setIsScanning(true)}
       className="fixed bottom-20 right-4 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors"
     >
       <Camera className="w-8 h-8 text-white" />
     </button>

     {isScanning && (
       <QrScanner
         onResult={handleScan}
         onClose={() => setIsScanning(false)}
       />
     )}
   </>
 )
}
