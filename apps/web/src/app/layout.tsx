import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
 title: 'Aqua Loyalty',
 description: 'Loyalty program za Aqua Caffe',
}

export default function RootLayout({
 children,
}: {
 children: React.ReactNode
}) {
 return (
   <html lang="sr">
     <body className={inter.className}>
       <Providers>
         <Header />
         <main className="min-h-screen">{children}</main>
         <Footer />
       </Providers>
     </body>
   </html>
 )
}
