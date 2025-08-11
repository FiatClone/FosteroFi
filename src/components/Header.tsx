'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Sun, Moon } from 'lucide-react'
import Button from './ui/Button'
import WalletConnect from './WalletConnect'
import { clsx } from 'clsx'

const navigation = [
  { name: 'Dashboard', href: '/' },
  { name: 'NFT Mint', href: '/nft' },
  { name: 'Swap', href: '/swap' },
  { name: 'Liquidity', href: '/liquidity' },
  { name: 'Staking', href: '/staking' },
  { name: 'Bridge', href: '/bridge' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const pathname = usePathname()

  const toggleTheme = () => {
    setDarkMode(!darkMode)
    document.documentElement.setAttribute('data-theme', darkMode ? 'light' : 'dark')
  }

  return (
    <header className="neu-card sticky top-0 z-50 backdrop-blur-md">
      <div className="neu-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center">
              <span className="text-white font-bold text-sm">CD</span>
            </div>
            <span className="text-xl font-bold gradient-text">CryptoDefi</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  pathname === item.href
                    ? 'neu-inset text-[var(--primary)]'
                    : 'hover:bg-white/5 text-[var(--text)]'
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="p-2"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            {/* Wallet Connect */}
            <div className="hidden sm:block">
              <WalletConnect />
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden neu-card mt-2 mx-4">
          <div className="px-4 py-3 space-y-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  'block px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  pathname === item.href
                    ? 'neu-inset text-[var(--primary)]'
                    : 'hover:bg-white/5 text-[var(--text)]'
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-3 border-t border-white/10">
              <WalletConnect />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
