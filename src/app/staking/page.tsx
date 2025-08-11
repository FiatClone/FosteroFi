'use client'

import { useState, useEffect } from 'react'
import { useAccount, useBalance, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi'
import { parseEther, formatEther } from 'viem'
import Header from '@/components/Header'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import WalletConnect from '@/components/WalletConnect'
import { STAKING_CONTRACT_ABI, ERC20_ABI, CONTRACT_ADDRESSES } from '@/contracts/interfaces'
import { Lock, Gift, TrendingUp, Clock } from 'lucide-react'

const stakingPools = [
  {
    id: 1,
    name: 'ETH Staking',
    token: 'ETH',
    apy: '8.5%',
    lockPeriod: '30 days',
    minStake: '0.1',
    totalStaked: '12,450 ETH',
    address: CONTRACT_ADDRESSES.STAKING
  },
  {
    id: 2,
    name: 'USDC Staking',
    token: 'USDC',
    apy: '12.3%',
    lockPeriod: '90 days',
    minStake: '100',
    totalStaked: '2.4M USDC',
    address: CONTRACT_ADDRESSES.STAKING
  }
]

export default function Staking() {
  const { address, isConnected } = useAccount()
  const [selectedPool, setSelectedPool] = useState(stakingPools[0])
  const [activeTab, setActiveTab] = useState<'stake' | 'unstake'>('stake')
  const [stakeAmount, setStakeAmount] = useState('')
  const [unstakeAmount, setUnstakeAmount] = useState('')

  const { data: balance } = useBalance({
    address: address,
    token: selectedPool.token === 'ETH' ? undefined : CONTRACT_ADDRESSES.TOKEN_A,
  })

  const { data: stakedAmount } = useReadContract({
    address: selectedPool.address as `0x${string}`,
    abi: STAKING_CONTRACT_ABI,
    functionName: 'getStakedAmount',
    args: address ? [address] : undefined,
  })

  const { data: pendingRewards } = useReadContract({
    address: selectedPool.address as `0x${string}`,
    abi: STAKING_CONTRACT_ABI,
    functionName: 'getPendingRewards',
    args: address ? [address] : undefined,
  })

  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const handleStake = async () => {
    if (!address || !stakeAmount) return

    try {
      writeContract({
        address: selectedPool.address as `0x${string}`,
        abi: STAKING_CONTRACT_ABI,
        functionName: 'stake',
        args: [parseEther(stakeAmount)],
        value: selectedPool.token === 'ETH' ? parseEther(stakeAmount) : undefined,
      })
    } catch (error) {
      console.error('Staking failed:', error)
    }
  }

  const handleUnstake = async () => {
    if (!address || !unstakeAmount) return

    try {
      writeContract({
        address: selectedPool.address as `0x${string}`,
        abi: STAKING_CONTRACT_ABI,
        functionName: 'unstake',
        args: [parseEther(unstakeAmount)],
      })
    } catch (error) {
      console.error('Unstaking failed:', error)
    }
  }

  const handleClaimRewards = async () => {
    if (!address) return

    try {
      writeContract({
        address: selectedPool.address as `0x${string}`,
        abi: STAKING_CONTRACT_ABI,
        functionName: 'claimRewards',
        args: [],
      })
    } catch (error) {
      console.error('Claim rewards failed:', error)
    }
  }

  const resetForm = () => {
    setStakeAmount('')
    setUnstakeAmount('')
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-[var(--background)]">
        <Header />
        <main className="neu-container py-12">
          <div className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
              <Lock className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Staking</h1>
            <p className="text-[var(--text-light)] mb-8">
              Connect your wallet to start staking and earning rewards
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
              <span className="gradient-text">Staking Pools</span>
            </h1>
            <p className="text-[var(--text-light)]">
              Stake your tokens to earn passive rewards
            </p>
          </div>

          {/* Pool Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {stakingPools.map((pool) => (
              <Card 
                key={pool.id} 
                className={`cursor-pointer transition-all duration-200 ${
                  selectedPool.id === pool.id ? 'ring-2 ring-[var(--primary)]' : ''
                }`}
                onClick={() => setSelectedPool(pool)}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                    <Lock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{pool.name}</h3>
                    <p className="text-[var(--text-light)] text-sm">{pool.token} Token</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[var(--text-light)] text-sm">APY</p>
                    <p className="font-bold text-[var(--success)] text-lg">{pool.apy}</p>
                  </div>
                  <div>
                    <p className="text-[var(--text-light)] text-sm">Lock Period</p>
                    <p className="font-bold">{pool.lockPeriod}</p>
                  </div>
                  <div>
                    <p className="text-[var(--text-light)] text-sm">Min Stake</p>
                    <p className="font-bold">{pool.minStake} {pool.token}</p>
                  </div>
                  <div>
                    <p className="text-[var(--text-light)] text-sm">Total Staked</p>
                    <p className="font-bold">{pool.totalStaked}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Staking Interface */}
            <div className="lg:col-span-2">
              <Card>
                <div className="flex items-center gap-2 mb-6">
                  <Lock className="w-5 h-5" />
                  <h2 className="text-xl font-bold">
                    {selectedPool.name}
                  </h2>
                </div>

                {/* Tabs */}
                <div className="flex neu-inset rounded-lg p-1 mb-6">
                  <button
                    onClick={() => setActiveTab('stake')}
                    className={`flex-1 py-2 px-4 rounded-md transition-all duration-200 ${
                      activeTab === 'stake' ? 'neu-flat shadow-sm' : 'bg-transparent'
                    }`}
                  >
                    <Lock className="w-4 h-4 mx-auto mb-1" />
                    Stake
                  </button>
                  <button
                    onClick={() => setActiveTab('unstake')}
                    className={`flex-1 py-2 px-4 rounded-md transition-all duration-200 ${
                      activeTab === 'unstake' ? 'neu-flat shadow-sm' : 'bg-transparent'
                    }`}
                  >
                    <TrendingUp className="w-4 h-4 mx-auto mb-1" />
                    Unstake
                  </button>
                </div>

                {isSuccess ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                      <Lock className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-[var(--success)]">
                      {activeTab === 'stake' ? 'Staking Successful!' : 'Unstaking Successful!'}
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
                    {activeTab === 'stake' ? (
                      <>
                        <Input
                          label={`${selectedPool.token} Amount`}
                          placeholder={`Min: ${selectedPool.minStake} ${selectedPool.token}`}
                          value={stakeAmount}
                          onChange={(e) => setStakeAmount(e.target.value)}
                        />
                        
                        <div className="neu-card p-4 bg-gradient-to-r from-[var(--primary)]/5 to-[var(--primary-dark)]/5">
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-[var(--text-light)]">Est. Annual Rewards:</span>
                              <span className="text-[var(--success)]">
                                {stakeAmount ? (Number(stakeAmount) * 0.085).toFixed(4) : '0.0000'} {selectedPool.token}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[var(--text-light)]">Lock Period:</span>
                              <span>{selectedPool.lockPeriod}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[var(--text-light)]">Unlock Date:</span>
                              <span>{new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>

                        <Button
                          variant="primary"
                          className="w-full"
                          onClick={handleStake}
                          loading={isPending || isConfirming}
                          disabled={!stakeAmount || Number(stakeAmount) < Number(selectedPool.minStake)}
                        >
                          {isPending ? 'Confirming...' : isConfirming ? 'Staking...' : 'Stake Tokens'}
                        </Button>
                      </>
                    ) : (
                      <>
                        <Input
                          label={`${selectedPool.token} Amount`}
                          placeholder="0.0"
                          value={unstakeAmount}
                          onChange={(e) => setUnstakeAmount(e.target.value)}
                        />
                        
                        <div className="neu-card p-4 bg-gradient-to-r from-[var(--warning)]/5 to-[var(--warning)]/5">
                          <p className="text-sm text-[var(--warning)]">
                            ⚠️ Unstaking before the lock period ends may result in penalties
                          </p>
                        </div>

                        <Button
                          variant="primary"
                          className="w-full"
                          onClick={handleUnstake}
                          loading={isPending || isConfirming}
                          disabled={!unstakeAmount}
                        >
                          {isPending ? 'Confirming...' : isConfirming ? 'Unstaking...' : 'Unstake Tokens'}
                        </Button>
                      </>
                    )}
                  </div>
                )}
              </Card>
            </div>

            {/* Staking Overview */}
            <div className="space-y-6">
              {/* Current Position */}
              <Card>
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Your Position
                </h3>
                
                <div className="space-y-4">
                  <div className="neu-inset rounded-lg p-4">
                    <p className="text-[var(--text-light)] text-sm mb-1">Staked Amount</p>
                    <p className="text-2xl font-bold">
                      {stakedAmount ? formatEther(stakedAmount) : '0.0000'} {selectedPool.token}
                    </p>
                  </div>
                  
                  <div className="neu-inset rounded-lg p-4">
                    <p className="text-[var(--text-light)] text-sm mb-1">Pending Rewards</p>
                    <p className="text-xl font-bold text-[var(--success)]">
                      {pendingRewards ? formatEther(pendingRewards) : '0.0000'} {selectedPool.token}
                    </p>
                  </div>

                  <Button
                    variant="primary"
                    className="w-full"
                    onClick={handleClaimRewards}
                    disabled={!pendingRewards || pendingRewards === 0n}
                  >
                    <Gift className="w-4 h-4" />
                    Claim Rewards
                  </Button>
                </div>
              </Card>

              {/* Stats */}
              <Card>
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Pool Stats
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-[var(--text-light)]">Total Staked:</span>
                    <span className="font-bold">{selectedPool.totalStaked}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-light)]">APY:</span>
                    <span className="font-bold text-[var(--success)]">{selectedPool.apy}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-light)]">Lock Period:</span>
                    <span className="font-bold">{selectedPool.lockPeriod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-light)]">Min Stake:</span>
                    <span className="font-bold">{selectedPool.minStake} {selectedPool.token}</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
