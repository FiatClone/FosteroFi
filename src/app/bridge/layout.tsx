import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import MobileNav from '@/components/MobileNav'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CryptoDefi - Decentralized Finance Platform',
  description: 'A comprehensive DeFi platform with NFT minting, token swapping, staking, and liquidity pools',
  keywords: ['defi', 'nft', 'ethereum', 'web3', 'dapp', 'blockchain', 'crypto'],
  authors: [{ name: 'CryptoDefi Team' }],
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
          <MobileNav />
        </Providers>
      </body>
    </html>
  )
}
