import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  Users,
  Gift,
  Receipt,
  Settings,
} from 'lucide-react'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/users', label: 'Korisnici', icon: Users },
  { href: '/rewards', label: 'Nagrade', icon: Gift },
  { href: '/receipts', label: 'Računi', icon: Receipt },
  { href: '/settings', label: 'Podešavanja', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white border-r">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-blue-600">
          Aqua Admin
        </h1>
      </div>
      <nav className="px-4">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md mb-1 ${
                pathname === item.href
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
