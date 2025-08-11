// Konfigurasi optimasi untuk Vercel deployment
export const vercelConfig = {
  // Environment variables dengan fallback
  walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'demo_project_id',
  alchemyApiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || 'demo_alchemy_key',
  infuraApiKey: process.env.NEXT_PUBLIC_INFURA_API_KEY || 'demo_infura_key',
  
  // App configuration
  appName: process.env.NEXT_PUBLIC_APP_NAME || 'CryptoDefi',
  appVersion: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
  
  // Network configuration untuk production
  networks: {
    mainnet: {
      chainId: 1,
      name: 'Ethereum Mainnet',
      rpcUrls: [`https://eth-mainnet.alchemyapi.io/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`],
    },
    sepolia: {
      chainId: 11155111,
      name: 'Sepolia Testnet', 
      rpcUrls: [`https://eth-sepolia.alchemyapi.io/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`],
    },
    polygon: {
      chainId: 137,
      name: 'Polygon Mainnet',
      rpcUrls: [`https://polygon-mainnet.alchemyapi.io/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`],
    }
  },
  
  // Contract addresses (update dengan address yang benar)
  contracts: {
    NFT: '0x0000000000000000000000000000000000000000',
    STAKING: '0x0000000000000000000000000000000000000000', 
    LIQUIDITY_POOL: '0x0000000000000000000000000000000000000000',
    TOKEN_A: '0x0000000000000000000000000000000000000000',
    TOKEN_B: '0x0000000000000000000000000000000000000000',
  },
  
  // Feature flags untuk production
  features: {
    enableNFTMinting: true,
    enableTokenSwap: true,
    enableLiquidityPools: true,
    enableStaking: true,
    enableBridge: true,
    enableAnalytics: true,
  }
}

// Function untuk check environment variables
export const checkEnvironmentVariables = () => {
  const required = [
    'NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID',
    'NEXT_PUBLIC_ALCHEMY_API_KEY'
  ]
  
  const missing = required.filter(key => !process.env[key] || process.env[key]?.startsWith('demo_') || process.env[key]?.startsWith('test_'))
  
  if (missing.length > 0) {
    console.warn('⚠️ Missing or demo environment variables:', missing)
    console.warn('Please set these in your Vercel dashboard for production')
  }
  
  return missing.length === 0
}

// Function untuk get optimized RPC URLs
export const getOptimizedRPCUrl = (chainId: number) => {
  const apiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
  
  switch (chainId) {
    case 1: // Mainnet
      return `https://eth-mainnet.alchemyapi.io/v2/${apiKey}`
    case 11155111: // Sepolia
      return `https://eth-sepolia.alchemyapi.io/v2/${apiKey}`
    case 137: // Polygon
      return `https://polygon-mainnet.alchemyapi.io/v2/${apiKey}`
    default:
      return `https://eth-mainnet.alchemyapi.io/v2/${apiKey}`
  }
}
