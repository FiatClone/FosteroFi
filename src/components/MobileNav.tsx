'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  Palette,
  ArrowUpDown,
  Droplets,
  Lock,
  Building2,
  Menu,
  X
} from 'lucide-react'
import { clsx } from 'clsx'

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'NFT Mint', href: '/nft', icon: Palette },
  { name: 'Swap', href: '/swap', icon: ArrowUpDown },
  { name: 'Liquidity', href: '/liquidity', icon: Droplets },
  { name: 'Staking', href: '/staking', icon: Lock },
  { name: 'Bridge', href: '/bridge', icon: Building2 },
]

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed bottom-4 right-4 z-40 neu-button-primary w-12 h-12 rounded-full flex items-center justify-center"
      >
        <Menu className="w-6 h-6 text-white" />
      </button>

      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
          <div className="absolute right-0 top-0 h-full w-80 max-w-full neu-card rounded-l-2xl p-6">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 hover:bg-white/5 rounded-lg"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Links */}
            <div className="mt-12 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={clsx(
                    'flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200',
                    pathname === item.href
                      ? 'neu-inset text-[var(--primary)] bg-[var(--primary)]/10'
                      : 'hover:bg-white/5 text-[var(--text)]'
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Tab Bar for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 neu-card rounded-t-2xl border-t border-white/10 px-4 py-2">
        <div className="flex items-center justify-around">
          {navigation.slice(0, 5).map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                'flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-200',
                pathname === item.href
                  ? 'text-[var(--primary)]'
                  : 'text-[var(--text-light)] hover:text-[var(--text)]'
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
