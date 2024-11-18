'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function AdminNavBar() {
  const pathname = usePathname();

  const links = [
    { href: '/admin', label: 'Dashboard' },
    { href: '/admin/restaurants', label: 'Restorani' },
    { href: '/admin/users', label: 'Korisnici' },
  ];

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <span className="text-xl font-bold">Admin Panel</span>
            <div className="ml-10 flex items-baseline space-x-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === link.href
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
