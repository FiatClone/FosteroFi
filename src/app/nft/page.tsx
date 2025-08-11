'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi'
import { parseEther, formatEther } from 'viem'
import Header from '@/components/Header'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import WalletConnect from '@/components/WalletConnect'
import { NFT_CONTRACT_ABI, CONTRACT_ADDRESSES } from '@/contracts/interfaces'
import { Palette, Upload, ExternalLink } from 'lucide-react'

export default function NFTMint() {
  const { address, isConnected } = useAccount()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [mintedTokenId, setMintedTokenId] = useState<number | null>(null)

  const { data: mintPrice } = useReadContract({
    address: CONTRACT_ADDRESSES.NFT,
    abi: NFT_CONTRACT_ABI,
    functionName: 'mintPrice',
  })

  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const handleMint = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!address || !name || !description) return

    try {
      // In a real app, you would upload metadata to IPFS
      const metadata = {
        name,
        description,
        image: imageUrl,
        attributes: [
          { trait_type: 'Creator', value: address },
          { trait_type: 'Created', value: new Date().toISOString() }
        ]
      }

      writeContract({
        address: CONTRACT_ADDRESSES.NFT,
        abi: NFT_CONTRACT_ABI,
        functionName: 'mint',
        args: [address],
        value: mintPrice || parseEther('0.01'),
      })
    } catch (error) {
      console.error('Minting failed:', error)
    }
  }

  const resetForm = () => {
    setName('')
    setDescription('')
    setImageUrl('')
    setMintedTokenId(null)
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-[var(--background)]">
        <Header />
        <main className="neu-container py-12">
          <div className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <Palette className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-4">NFT Minting</h1>
            <p className="text-[var(--text-light)] mb-8">
              Connect your wallet to start minting unique NFTs
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
              <span className="gradient-text">Mint Your NFT</span>
            </h1>
            <p className="text-[var(--text-light)]">
              Create unique digital assets on the blockchain
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Mint Form */}
            <Card>
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Create NFT
              </h2>

              {isSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                    <Palette className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-[var(--success)]">
                    NFT Minted Successfully!
                  </h3>
                  <p className="text-[var(--text-light)] mb-6">
                    Your NFT has been minted and added to your wallet
                  </p>
                  <div className="space-y-3">
                    <Button
                      variant="primary"
                      className="w-full"
                      onClick={() => window.open(`https://etherscan.io/tx/${hash}`, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4" />
                      View on Etherscan
                    </Button>
                    <Button
                      variant="secondary"
                      className="w-full"
                      onClick={resetForm}
                    >
                      Mint Another NFT
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleMint} className="space-y-6">
                  <Input
                    label="NFT Name"
                    placeholder="Enter NFT name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />

                  <div>
                    <label className="block text-sm font-medium text-[var(--text)] mb-2">
                      Description
                    </label>
                    <textarea
                      className="neu-input w-full h-24 resize-none"
                      placeholder="Describe your NFT"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>

                  <Input
                    label="Image URL (Optional)"
                    placeholder="https://example.com/image.jpg"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                  />

                  <div className="neu-card p-4 bg-gradient-to-r from-[var(--primary)]/10 to-[var(--primary-dark)]/10">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[var(--text-light)]">Mint Price:</span>
                      <span className="font-bold">
                        {mintPrice ? formatEther(mintPrice) : '0.01'} ETH
                      </span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full"
                    loading={isPending || isConfirming}
                    disabled={!name || !description}
                  >
                    {isPending ? 'Confirming...' : isConfirming ? 'Minting...' : 'Mint NFT'}
                  </Button>
                </form>
              )}
            </Card>

            {/* Preview */}
            <Card>
              <h2 className="text-xl font-bold mb-6">Preview</h2>
              
              <div className="neu-card p-4">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="NFT Preview"
                    className="w-full h-48 object-cover rounded-lg mb-4"
                    onError={(e) => {
                      e.currentTarget.src = '/api/placeholder/300/200'
                    }}
                  />
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-[var(--primary)]/20 to-[var(--primary-dark)]/20 rounded-lg mb-4 flex items-center justify-center">
                    <Upload className="w-12 h-12 text-[var(--text-light)]" />
                  </div>
                )}
                
                <h3 className="text-lg font-bold mb-2">
                  {name || 'NFT Name'}
                </h3>
                <p className="text-[var(--text-light)] text-sm mb-4">
                  {description || 'NFT description will appear here...'}
                </p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[var(--text-light)]">Creator:</span>
                    <span className="font-mono">
                      {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'You'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-light)]">Blockchain:</span>
                    <span>Ethereum</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
