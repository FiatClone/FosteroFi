'use client'

import { useState } from 'react'
import { useAccount, useBalance, useSwitchChain, useChainId } from 'wagmi'
import { mainnet, polygon, bsc, arbitrum } from 'wagmi/chains'
import Header from '@/components/Header'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import WalletConnect from '@/components/WalletConnect'
import { Building2, ArrowRight, ExternalLink, Clock, CheckCircle } from 'lucide-react'

const supportedChains = [
  { 
    ...mainnet, 
    name: 'Ethereum',
    icon: '🔷',
    bridgeFee: '0.005 ETH',
    estimatedTime: '15-30 min'
  },
  { 
    ...polygon, 
    name: 'Polygon',
    icon: '🟣',
    bridgeFee: '0.1 MATIC',
    estimatedTime: '5-10 min'
  },
  { 
    ...bsc, 
    name: 'BSC',
    icon: '🟡',
    bridgeFee: '0.001 BNB',
    estimatedTime: '3-5 min'
  },
  { 
    ...arbitrum, 
    name: 'Arbitrum',
    icon: '🔵',
    bridgeFee: '0.002 ETH',
    estimatedTime: '10-15 min'
  }
]

const tokens = [
  { symbol: 'ETH', name: 'Ethereum', icon: '🔷' },
  { symbol: 'USDC', name: 'USD Coin', icon: '💵' },
  { symbol: 'USDT', name: 'Tether', icon: '💰' },
  { symbol: 'DAI', name: 'Dai Stablecoin', icon: '📊' }
]

interface BridgeTransaction {
  id: string
  from: string
  to: string
  amount: string
  token: string
  status: 'pending' | 'completed' | 'failed'
  hash?: string
  timestamp: number
}

export default function BridgePage() {
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  const { switchChain } = useSwitchChain()
  
  const [fromChain, setFromChain] = useState(supportedChains[0])
  const [toChain, setToChain] = useState(supportedChains[1])
  const [selectedToken, setSelectedToken] = useState(tokens[0])
  const [amount, setAmount] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [bridgeTransactions, setBridgeTransactions] = useState<BridgeTransaction[]>([
    {
      id: '1',
      from: 'Ethereum',
      to: 'Polygon',
      amount: '0.5',
      token: 'ETH',
      status: 'completed',
      hash: '0x123...abc',
      timestamp: Date.now() - 1800000
    },
    {
      id: '2',
      from: 'Polygon',
      to: 'BSC',
      amount: '100',
      token: 'USDC',
      status: 'pending',
      timestamp: Date.now() - 300000
    }
  ])

  const { data: balance } = useBalance({
    address: address,
  })

  const handleSwapChains = () => {
    const temp = fromChain
    setFromChain(toChain)
    setToChain(temp)
  }

  const handleBridge = async () => {
    if (!address || !amount) return

    setIsProcessing(true)
    
    try {
      // Switch to source chain if needed
      if (chainId !== fromChain.id) {
        await switchChain({ chainId: fromChain.id })
      }

      // Simulate bridge transaction
      const newTransaction: BridgeTransaction = {
        id: Date.now().toString(),
        from: fromChain.name,
        to: toChain.name,
        amount,
        token: selectedToken.symbol,
        status: 'pending',
        timestamp: Date.now()
      }

      setBridgeTransactions(prev => [newTransaction, ...prev])

      // Simulate processing time
      setTimeout(() => {
        setBridgeTransactions(prev => 
          prev.map(tx => 
            tx.id === newTransaction.id 
              ? { ...tx, status: 'completed', hash: '0x' + Math.random().toString(16).substr(2, 8) + '...abc' }
              : tx
          )
        )
        setIsProcessing(false)
        setAmount('')
      }, 3000)

    } catch (error) {
      console.error('Bridge failed:', error)
      setIsProcessing(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-[var(--success)]" />
      case 'pending':
        return <Clock className="w-4 h-4 text-[var(--warning)]" />
      case 'failed':
        return <ExternalLink className="w-4 h-4 text-[var(--error)]" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-[var(--success)]'
      case 'pending':
        return 'text-[var(--warning)]'
      case 'failed':
        return 'text-[var(--error)]'
      default:
        return ''
    }
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-[var(--background)]">
        <Header />
        <main className="neu-container py-12">
          <div className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
              <Building2 className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Cross-Chain Bridge</h1>
            <p className="text-[var(--text-light)] mb-8">
              Connect your wallet to bridge assets across different blockchains
            </p>
            <WalletConnect />
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header />
      
      <main className="neu-container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">
              <span className="gradient-text">Cross-Chain Bridge</span>
            </h1>
            <p className="text-[var(--text-light)]">
              Transfer your assets securely across different blockchains
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Bridge Interface */}
            <div className="lg:col-span-2">
              <Card>
                <div className="flex items-center gap-2 mb-6">
                  <Building2 className="w-5 h-5" />
                  <h2 className="text-xl font-bold">Bridge Assets</h2>
                </div>

                <div className="space-y-6">
                  {/* Chain Selection */}
                  <div>
                    <label className="block text-sm font-medium text-[var(--text)] mb-3">
                      Select Chains
                    </label>
                    <div className="flex items-center gap-4">
                      {/* From Chain */}
                      <div className="flex-1">
                        <label className="block text-xs text-[var(--text-light)] mb-2">From</label>
                        <select
                          value={fromChain.id}
                          onChange={(e) => setFromChain(supportedChains.find(c => c.id === Number(e.target.value))!)}
                          className="neu-input w-full"
                        >
                          {supportedChains.map((chain) => (
                            <option key={chain.id} value={chain.id}>
                              {chain.icon} {chain.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Swap Button */}
                      <div className="flex items-end pb-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleSwapChains}
                          className="p-2 rounded-full"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* To Chain */}
                      <div className="flex-1">
                        <label className="block text-xs text-[var(--text-light)] mb-2">To</label>
                        <select
                          value={toChain.id}
                          onChange={(e) => setToChain(supportedChains.find(c => c.id === Number(e.target.value))!)}
                          className="neu-input w-full"
                        >
                          {supportedChains.map((chain) => (
                            <option key={chain.id} value={chain.id}>
                              {chain.icon} {chain.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Token Selection */}
                  <div>
                    <label className="block text-sm font-medium text-[var(--text)] mb-3">
                      Select Token
                    </label>
                    <select
                      value={selectedToken.symbol}
                      onChange={(e) => setSelectedToken(tokens.find(t => t.symbol === e.target.value)!)}
                      className="neu-input w-full"
                    >
                      {tokens.map((token) => (
                        <option key={token.symbol} value={token.symbol}>
                          {token.icon} {token.name} ({token.symbol})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Amount Input */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium text-[var(--text)]">
                        Amount
                      </label>
                      <span className="text-sm text-[var(--text-light)]">
                        Balance: {balance ? parseFloat(balance.formatted).toFixed(4) : '0.0000'} {selectedToken.symbol}
                      </span>
                    </div>
                    <Input
                      placeholder="0.0"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>

                  {/* Bridge Details */}
                  {amount && (
                    <div className="neu-card p-4 bg-gradient-to-r from-[var(--primary)]/5 to-[var(--primary-dark)]/5">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-[var(--text-light)]">Bridge Fee:</span>
                          <span>{fromChain.bridgeFee}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[var(--text-light)]">Estimated Time:</span>
                          <span>{fromChain.estimatedTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[var(--text-light)]">You'll receive:</span>
                          <span className="font-bold">~{amount} {selectedToken.symbol}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Bridge Button */}
                  <Button
                    variant="primary"
                    className="w-full"
                    onClick={handleBridge}
                    loading={isProcessing}
                    disabled={!amount || fromChain.id === toChain.id}
                  >
                    {isProcessing ? 'Processing Bridge...' : 'Start Bridge'}
                  </Button>

                  {/* Chain Switch Warning */}
                  {chainId !== fromChain.id && (
                    <div className="neu-card p-4 bg-gradient-to-r from-[var(--warning)]/5 to-[var(--warning)]/5">
                      <p className="text-sm text-[var(--warning)]">
                        ⚠️ Please switch to {fromChain.name} network to continue
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            </div>

            {/* Transaction History */}
            <div>
              <Card>
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Recent Bridges
                </h3>
                
                <div className="space-y-3">
                  {bridgeTransactions.length > 0 ? (
                    bridgeTransactions.map((tx) => (
                      <Card key={tx.id} variant="glass" className="p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(tx.status)}
                            <span className={`text-sm font-medium ${getStatusColor(tx.status)}`}>
                              {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                            </span>
                          </div>
                          <span className="text-xs text-[var(--text-light)]">
                            {new Date(tx.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        
                        <div className="text-sm">
                          <p className="mb-1">
                            <span className="font-bold">{tx.amount} {tx.token}</span>
                          </p>
                          <p className="text-[var(--text-light)]">
                            {tx.from} → {tx.to}
                          </p>
                          {tx.hash && (
                            <button
                              onClick={() => window.open(`https://etherscan.io/tx/${tx.hash}`, '_blank')}
                              className="text-[var(--primary)] hover:underline text-xs mt-1"
                            >
                              View transaction ↗
                            </button>
                          )}
                        </div>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center text-[var(--text-light)] py-8">
                      <Building2 className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p>No bridge transactions yet</p>
                    </div>
                  )}
                </div>
              </Card>

              {/* Supported Chains */}
              <Card className="mt-6">
                <h3 className="text-lg font-bold mb-4">Supported Networks</h3>
                <div className="space-y-2">
                  {supportedChains.map((chain) => (
                    <div key={chain.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5">
                      <div className="flex items-center gap-2">
                        <span>{chain.icon}</span>
                        <span className="text-sm">{chain.name}</span>
                      </div>
                      <span className="text-xs text-[var(--text-light)]">
                        {chain.estimatedTime}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
