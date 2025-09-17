'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { User, ChevronDown } from 'lucide-react'
import { clsx } from 'clsx'

const navigation = [
  { name: 'Dashboard', href: '/' },
  { name: 'Workflows', href: '/workflows' },
  { name: 'Templates', href: '/templates' },
  { name: 'Runs', href: '/runs' },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-blue-600">
                FlowMate
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={clsx(
                    'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium',
                    pathname === item.href
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {/* Workspace Switcher */}
            <div className="relative mr-4">
              <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
                Demo Workspace
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
            </div>
            
            {/* User Menu */}
            <div className="relative">
              <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
                <User className="h-5 w-5" />
                <span className="ml-2">Demo User</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}