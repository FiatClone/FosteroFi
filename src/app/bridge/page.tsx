'use client'

import { useAccount, useBalance } from 'wagmi'
import Link from 'next/link'
import Header from '@/components/Header'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import WalletConnect from '@/components/WalletConnect'
import {
  Coins,
  Palette,
  ArrowUpDown,
  Droplets,
  Lock,
  Building2,
  TrendingUp,
  Shield,
  Zap
} from 'lucide-react'

const features = [
  {
    title: 'NFT Minting',
    description: 'Create and mint unique NFTs with custom metadata',
    icon: Palette,
    href: '/nft',
    color: 'from-purple-500 to-pink-500'
  },
  {
    title: 'Token Swap',
    description: 'Swap tokens instantly with low fees',
    icon: ArrowUpDown,
    href: '/swap',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'Liquidity Pools',
    description: 'Provide liquidity and earn rewards',
    icon: Droplets,
    href: '/liquidity',
    color: 'from-green-500 to-emerald-500'
  },
  {
    title: 'Staking',
    description: 'Stake tokens and earn passive income',
    icon: Lock,
    href: '/staking',
    color: 'from-orange-500 to-red-500'
  },
  {
    title: 'Bridge',
    description: 'Transfer assets across different chains',
    icon: Building2,
    href: '/bridge',
    color: 'from-indigo-500 to-purple-500'
  }
]

const stats = [
  { label: 'Total Value Locked', value: '$2.4M', icon: Shield },
  { label: 'Daily Volume', value: '$145K', icon: TrendingUp },
  { label: 'Active Users', value: '1,247', icon: Zap }
]

export default function Dashboard() {
  const { address, isConnected } = useAccount()
  const { data: balance } = useBalance({
    address: address,
  })

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header />
      
      <main className="neu-container py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">CryptoDefi</span>
          </h1>
          <p className="text-xl text-[var(--text-light)] mb-8 max-w-2xl mx-auto">
            Experience the future of decentralized finance with our comprehensive DeFi platform. 
            Mint NFTs, swap tokens, provide liquidity, and earn rewards.
          </p>
          
          {!isConnected && (
            <div className="flex justify-center">
              <WalletConnect />
            </div>
          )}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover-glow">
              <stat.icon className="w-8 h-8 mx-auto mb-3 text-[var(--primary)]" />
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-[var(--text-light)]">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Balance Card */}
        {isConnected && balance && (
          <Card className="mb-12 text-center">
            <h3 className="text-lg font-semibold mb-2">Your Balance</h3>
            <div className="text-3xl font-bold gradient-text mb-2">
              {parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
            </div>
            <p className="text-[var(--text-light)]">Connected to {balance.symbol} network</p>
          </Card>
        )}

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="group hover-scale hover-glow transition-all duration-300">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-[var(--text-light)] mb-6">{feature.description}</p>
              <Link href={feature.href}>
                <Button variant="primary" className="w-full">
                  Get Started
                </Button>
              </Link>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <Card className="text-center bg-gradient-to-r from-[var(--primary)]/10 to-[var(--primary-dark)]/10 border-[var(--primary)]/20">
          <h2 className="text-2xl font-bold mb-4">Ready to Start?</h2>
          <p className="text-[var(--text-light)] mb-6 max-w-2xl mx-auto">
            Join thousands of users who are already earning with our DeFi platform. 
            Connect your wallet and start exploring decentralized finance today.
          </p>
          {!isConnected ? (
            <WalletConnect />
          ) : (
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/nft">
                <Button variant="primary">
                  <Palette className="w-4 h-4" />
                  Mint NFT
                </Button>
              </Link>
              <Link href="/swap">
                <Button variant="primary">
                  <ArrowUpDown className="w-4 h-4" />
                  Start Swapping
                </Button>
              </Link>
            </div>
          )}
        </Card>
      </main>

      {/* Footer */}
      <footer className="neu-container py-8 border-t border-white/10">
        <div className="text-center text-[var(--text-light)]">
          <p>&copy; 2024 CryptoDefi. Built with Next.js and ethers.js</p>
        </div>
      </footer>
    </div>
  )
}
