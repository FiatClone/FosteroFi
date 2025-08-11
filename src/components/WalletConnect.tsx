'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { useState } from 'react'
import Button from './ui/Button'
import Card from './ui/Card'
import { Wallet, LogOut, Copy, Check } from 'lucide-react'

export default function WalletConnect() {
  const { address, isConnected } = useAccount()
  const { connect, connectors, isPending } = useConnect()
  const { disconnect } = useDisconnect()
  const [copied, setCopied] = useState(false)

  const copyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  if (isConnected) {
    return (
      <Card className="flex items-center justify-between max-w-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center">
            <Wallet className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm text-[var(--text-light)]">Connected</p>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm">{formatAddress(address!)}</span>
              <button
                onClick={copyAddress}
                className="p-1 hover:bg-white/5 rounded"
                title="Copy address"
              >
                {copied ? (
                  <Check className="w-3 h-3 text-[var(--success)]" />
                ) : (
                  <Copy className="w-3 h-3 text-[var(--text-light)]" />
                )}
              </button>
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => disconnect()}
          className="ml-4"
        >
          <LogOut className="w-4 h-4" />
        </Button>
      </Card>
    )
  }

  return (
    <Card className="text-center max-w-md">
      <div className="mb-6">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center">
          <Wallet className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold mb-2">Connect Your Wallet</h3>
        <p className="text-[var(--text-light)]">
          Connect your wallet to access DeFi features
        </p>
      </div>
      
      <div className="space-y-3">
        {connectors.map((connector) => (
          <Button
            key={connector.uid}
            variant="primary"
            className="w-full"
            onClick={() => connect({ connector })}
            loading={isPending}
          >
            Connect {connector.name}
          </Button>
        ))}
      </div>
    </Card>
  )
}
