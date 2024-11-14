import Link from 'next/link'
import { useAuth } from '@/hooks/use-auth'
import { UserMenu } from './user-menu'

export function Header() {
  const { user } = useAuth()

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-2xl text-blue-600">
          Aqua Loyalty
        </Link>
        {user ? (
          <UserMenu user={user} />
        ) : (
          <Link
            href="/auth/login"
            className="text-sm font-medium text-gray-700 hover:text-blue-600"
          >
            Prijava
          </Link>
        )}
      </div>
    </header>
  )
}
