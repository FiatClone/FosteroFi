'use client'

import { useState, useEffect } from 'react'
import { useAccount, useBalance, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther, formatEther } from 'viem'
import Header from '@/components/Header'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import WalletConnect from '@/components/WalletConnect'
import { LIQUIDITY_POOL_ABI, ERC20_ABI, CONTRACT_ADDRESSES } from '@/contracts/interfaces'
import { ArrowUpDown, ArrowDown, Settings, RefreshCw } from 'lucide-react'

const tokens = [
  { symbol: 'ETH', name: 'Ethereum', address: 'native', decimals: 18 },
  { symbol: 'USDC', name: 'USD Coin', address: CONTRACT_ADDRESSES.TOKEN_A, decimals: 6 },
  { symbol: 'DAI', name: 'Dai Stablecoin', address: CONTRACT_ADDRESSES.TOKEN_B, decimals: 18 },
]

export default function Swap() {
  const { address, isConnected } = useAccount()
  const [fromToken, setFromToken] = useState(tokens[0])
  const [toToken, setToToken] = useState(tokens[1])
  const [fromAmount, setFromAmount] = useState('')
  const [toAmount, setToAmount] = useState('')
  const [slippage, setSlippage] = useState('0.5')
  const [showSettings, setShowSettings] = useState(false)

  const { data: fromBalance } = useBalance({
    address: address,
    token: fromToken.address === 'native' ? undefined : fromToken.address as `0x${string}`,
  })

  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  // Simulate price calculation (in real app, would fetch from DEX)
  useEffect(() => {
    if (fromAmount && !isNaN(Number(fromAmount))) {
      const rate = fromToken.symbol === 'ETH' ? 2000 : 1 // Simplified rate
      const calculated = fromToken.symbol === 'ETH' 
        ? (Number(fromAmount) * rate).toString()
        : (Number(fromAmount) / rate).toString()
      setToAmount(calculated)
    } else {
      setToAmount('')
    }
  }, [fromAmount, fromToken, toToken])

  const handleSwapTokens = () => {
    const tempToken = fromToken
    setFromToken(toToken)
    setToToken(tempToken)
    setFromAmount(toAmount)
    setToAmount(fromAmount)
  }

  const handleSwap = async () => {
    if (!address || !fromAmount || !toAmount) return

    try {
      // In a real implementation, you would interact with a DEX like Uniswap
      writeContract({
        address: CONTRACT_ADDRESSES.LIQUIDITY_POOL,
        abi: LIQUIDITY_POOL_ABI,
        functionName: 'swap',
        args: [parseEther(fromAmount), true], // swapAForB
        value: fromToken.address === 'native' ? parseEther(fromAmount) : undefined,
      })
    } catch (error) {
      console.error('Swap failed:', error)
    }
  }

  const resetSwap = () => {
    setFromAmount('')
    setToAmount('')
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-[var(--background)]">
        <Header />
        <main className="neu-container py-12">
          <div className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
              <ArrowUpDown className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Token Swap</h1>
            <p className="text-[var(--text-light)] mb-8">
              Connect your wallet to start swapping tokens
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
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">
              <span className="gradient-text">Token Swap</span>
            </h1>
            <p className="text-[var(--text-light)]">
              Swap tokens instantly with low fees
            </p>
          </div>

          {isSuccess ? (
            <Card className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                <ArrowUpDown className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-[var(--success)]">
                Swap Successful!
              </h3>
              <p className="text-[var(--text-light)] mb-6">
                Your tokens have been swapped successfully
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
                  onClick={resetSwap}
                >
                  Make Another Swap
                </Button>
              </div>
            </Card>
          ) : (
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Swap Tokens</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-2"
                >
                  <Settings className="w-4 h-4" />
                </Button>
              </div>

              {showSettings && (
                <div className="neu-inset rounded-lg p-4 mb-6">
                  <Input
                    label="Slippage Tolerance (%)"
                    value={slippage}
                    onChange={(e) => setSlippage(e.target.value)}
                    placeholder="0.5"
                  />
                </div>
              )}

              <div className="space-y-4">
                {/* From Token */}
                <div className="neu-inset rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-[var(--text-light)]">From</span>
                    <span className="text-sm text-[var(--text-light)]">
                      Balance: {fromBalance ? parseFloat(fromBalance.formatted).toFixed(4) : '0.0000'}
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <input
                      type="number"
                      placeholder="0.0"
                      value={fromAmount}
                      onChange={(e) => setFromAmount(e.target.value)}
                      className="flex-1 bg-transparent border-none outline-none text-xl font-semibold"
                    />
                    <select
                      value={fromToken.symbol}
                      onChange={(e) => setFromToken(tokens.find(t => t.symbol === e.target.value)!)}
                      className="neu-button px-3 py-1 text-sm"
                    >
                      {tokens.map((token) => (
                        <option key={token.symbol} value={token.symbol}>
                          {token.symbol}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Swap Direction Button */}
                <div className="flex justify-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSwapTokens}
                    className="p-2 rounded-full"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </Button>
                </div>

                {/* To Token */}
                <div className="neu-inset rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-[var(--text-light)]">To</span>
                    <span className="text-sm text-[var(--text-light)]">
                      Est. received
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <input
                      type="number"
                      placeholder="0.0"
                      value={toAmount}
                      readOnly
                      className="flex-1 bg-transparent border-none outline-none text-xl font-semibold"
                    />
                    <select
                      value={toToken.symbol}
                      onChange={(e) => setToToken(tokens.find(t => t.symbol === e.target.value)!)}
                      className="neu-button px-3 py-1 text-sm"
                    >
                      {tokens.map((token) => (
                        <option key={token.symbol} value={token.symbol}>
                          {token.symbol}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Swap Details */}
                {fromAmount && toAmount && (
                  <div className="neu-card p-4 bg-gradient-to-r from-[var(--primary)]/5 to-[var(--primary-dark)]/5">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-[var(--text-light)]">Rate:</span>
                        <span>1 {fromToken.symbol} ≈ {(Number(toAmount) / Number(fromAmount)).toFixed(4)} {toToken.symbol}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[var(--text-light)]">Slippage:</span>
                        <span>{slippage}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[var(--text-light)]">Network Fee:</span>
                        <span>~$5.00</span>
                      </div>
                    </div>
                  </div>
                )}

                <Button
                  variant="primary"
                  className="w-full"
                  onClick={handleSwap}
                  loading={isPending || isConfirming}
                  disabled={!fromAmount || !toAmount || fromToken.symbol === toToken.symbol}
                >
                  {isPending ? 'Confirming...' : isConfirming ? 'Swapping...' : 'Swap Tokens'}
                </Button>
              </div>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
