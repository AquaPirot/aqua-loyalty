'use client';

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Prijava</h1>
        <Button
          onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
          className="w-full"
        >
          Prijavi se sa Google-om
        </Button>
      </div>
    </div>
  );
}
