'use client';

import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Prijava</h1>
        <Button 
          onClick={() => signIn('google')}
          className="w-full"
        >
          Prijavi se sa Google-om
        </Button>
      </div>
    </div>
  );
}
