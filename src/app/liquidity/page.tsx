'use client'

import { useState } from 'react'
import { useAccount, useBalance, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi'
import { parseEther, formatEther } from 'viem'
import Header from '@/components/Header'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import WalletConnect from '@/components/WalletConnect'
import { LIQUIDITY_POOL_ABI, ERC20_ABI, CONTRACT_ADDRESSES } from '@/contracts/interfaces'
import { Droplets, Plus, Minus, TrendingUp } from 'lucide-react'

const pools = [
  {
    id: 1,
    tokenA: 'ETH',
    tokenB: 'USDC',
    apr: '12.5%',
    tvl: '$2.4M',
    volume24h: '$145K'
  },
  {
    id: 2,
    tokenA: 'ETH',
    tokenB: 'DAI',
    apr: '8.7%',
    tvl: '$1.8M',
    volume24h: '$98K'
  }
]

export default function Liquidity() {
  const { address, isConnected } = useAccount()
  const [activeTab, setActiveTab] = useState<'add' | 'remove'>('add')
  const [selectedPool, setSelectedPool] = useState(pools[0])
  const [amountA, setAmountA] = useState('')
  const [amountB, setAmountB] = useState('')
  const [lpTokenAmount, setLpTokenAmount] = useState('')

  const { data: balanceA } = useBalance({
    address: address,
  })

  const { data: balanceB } = useBalance({
    address: address,
    token: CONTRACT_ADDRESSES.TOKEN_A,
  })

  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const handleAddLiquidity = async () => {
    if (!address || !amountA || !amountB) return

    try {
      writeContract({
        address: CONTRACT_ADDRESSES.LIQUIDITY_POOL,
        abi: LIQUIDITY_POOL_ABI,
        functionName: 'addLiquidity',
        args: [parseEther(amountA), parseEther(amountB)],
        value: parseEther(amountA), // Assuming tokenA is ETH
      })
    } catch (error) {
      console.error('Add liquidity failed:', error)
    }
  }

  const handleRemoveLiquidity = async () => {
    if (!address || !lpTokenAmount) return

    try {
      writeContract({
        address: CONTRACT_ADDRESSES.LIQUIDITY_POOL,
        abi: LIQUIDITY_POOL_ABI,
        functionName: 'removeLiquidity',
        args: [parseEther(lpTokenAmount)],
      })
    } catch (error) {
      console.error('Remove liquidity failed:', error)
    }
  }

  const resetForm = () => {
    setAmountA('')
    setAmountB('')
    setLpTokenAmount('')
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-[var(--background)]">
        <Header />
        <main className="neu-container py-12">
          <div className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
              <Droplets className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Liquidity Pools</h1>
            <p className="text-[var(--text-light)] mb-8">
              Connect your wallet to provide liquidity and earn rewards
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
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">
              <span className="gradient-text">Liquidity Pools</span>
            </h1>
            <p className="text-[var(--text-light)]">
              Provide liquidity to earn trading fees and rewards
            </p>
          </div>

          {/* Pool Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {pools.map((pool) => (
              <Card 
                key={pool.id} 
                className={`cursor-pointer transition-all duration-200 ${
                  selectedPool.id === pool.id ? 'ring-2 ring-[var(--primary)]' : ''
                }`}
                onClick={() => setSelectedPool(pool)}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 border-2 border-white flex items-center justify-center">
                      <span className="text-xs font-bold text-white">{pool.tokenA}</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 border-2 border-white flex items-center justify-center">
                      <span className="text-xs font-bold text-white">{pool.tokenB}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold">{pool.tokenA}/{pool.tokenB}</h3>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[var(--text-light)]">APR:</span>
                    <span className="font-bold text-[var(--success)]">{pool.apr}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-light)]">TVL:</span>
                    <span className="font-bold">{pool.tvl}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-light)]">24h Volume:</span>
                    <span className="font-bold">{pool.volume24h}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Liquidity Management */}
            <Card>
              <div className="flex items-center gap-2 mb-6">
                <Droplets className="w-5 h-5" />
                <h2 className="text-xl font-bold">
                  {selectedPool.tokenA}/{selectedPool.tokenB} Pool
                </h2>
              </div>

              {/* Tabs */}
              <div className="flex neu-inset rounded-lg p-1 mb-6">
                <button
                  onClick={() => setActiveTab('add')}
                  className={`flex-1 py-2 px-4 rounded-md transition-all duration-200 ${
                    activeTab === 'add' ? 'neu-flat shadow-sm' : 'bg-transparent'
                  }`}
                >
                  <Plus className="w-4 h-4 mx-auto mb-1" />
                  Add Liquidity
                </button>
                <button
                  onClick={() => setActiveTab('remove')}
                  className={`flex-1 py-2 px-4 rounded-md transition-all duration-200 ${
                    activeTab === 'remove' ? 'neu-flat shadow-sm' : 'bg-transparent'
                  }`}
                >
                  <Minus className="w-4 h-4 mx-auto mb-1" />
                  Remove Liquidity
                </button>
              </div>

              {isSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                    <Droplets className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-[var(--success)]">
                    {activeTab === 'add' ? 'Liquidity Added!' : 'Liquidity Removed!'}
                  </h3>
                  <p className="text-[var(--text-light)] mb-6">
                    Your transaction has been processed successfully
                  </p>
                  <div className="space-y-3">
                    <Button
                      variant="primary"
                      className="w-full"
                      onClick={() => window.open(`https://etherscan.io/tx/${hash}`, '_blank')}
                    >
                      View Transaction
                    </Button>
                    <Button
                      variant="secondary"
                      className="w-full"
                      onClick={resetForm}
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {activeTab === 'add' ? (
                    <>
                      <Input
                        label={`${selectedPool.tokenA} Amount`}
                        placeholder="0.0"
                        value={amountA}
                        onChange={(e) => setAmountA(e.target.value)}
                      />
                      <Input
                        label={`${selectedPool.tokenB} Amount`}
                        placeholder="0.0"
                        value={amountB}
                        onChange={(e) => setAmountB(e.target.value)}
                      />
                      
                      <div className="neu-card p-4 bg-gradient-to-r from-[var(--primary)]/5 to-[var(--primary-dark)]/5">
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-[var(--text-light)]">Pool Share:</span>
                            <span>0.01%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[var(--text-light)]">LP Tokens:</span>
                            <span>~{amountA ? (Number(amountA) * 0.5).toFixed(4) : '0.0000'}</span>
                          </div>
                        </div>
                      </div>

                      <Button
                        variant="primary"
                        className="w-full"
                        onClick={handleAddLiquidity}
                        loading={isPending || isConfirming}
                        disabled={!amountA || !amountB}
                      >
                        {isPending ? 'Confirming...' : isConfirming ? 'Adding...' : 'Add Liquidity'}
                      </Button>
                    </>
                  ) : (
                    <>
                      <Input
                        label="LP Token Amount"
                        placeholder="0.0"
                        value={lpTokenAmount}
                        onChange={(e) => setLpTokenAmount(e.target.value)}
                      />
                      
                      <div className="neu-card p-4 bg-gradient-to-r from-[var(--primary)]/5 to-[var(--primary-dark)]/5">
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-[var(--text-light)]">You'll receive:</span>
                            <span></span>
                          </div>
                          <div className="flex justify-between">
                            <span>{selectedPool.tokenA}:</span>
                            <span>~{lpTokenAmount ? (Number(lpTokenAmount) * 2).toFixed(4) : '0.0000'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>{selectedPool.tokenB}:</span>
                            <span>~{lpTokenAmount ? (Number(lpTokenAmount) * 2000).toFixed(2) : '0.00'}</span>
                          </div>
                        </div>
                      </div>

                      <Button
                        variant="primary"
                        className="w-full"
                        onClick={handleRemoveLiquidity}
                        loading={isPending || isConfirming}
                        disabled={!lpTokenAmount}
                      >
                        {isPending ? 'Confirming...' : isConfirming ? 'Removing...' : 'Remove Liquidity'}
                      </Button>
                    </>
                  )}
                </div>
              )}
            </Card>

            {/* Your Positions */}
            <Card>
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Your Positions
              </h2>
              
              <div className="space-y-4">
                <Card variant="glass" className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-1">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 border border-white"></div>
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 border border-white"></div>
                      </div>
                      <span className="font-semibold">ETH/USDC</span>
                    </div>
                    <span className="text-sm px-2 py-1 rounded bg-[var(--success)]/20 text-[var(--success)]">
                      Active
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[var(--text-light)]">LP Tokens:</span>
                      <span>0.5234</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--text-light)]">Pool Share:</span>
                      <span>0.01%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--text-light)]">Earned Fees:</span>
                      <span className="text-[var(--success)]">$12.45</span>
                    </div>
                  </div>
                </Card>

                <div className="text-center text-[var(--text-light)]">
                  <p>No other positions found</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
