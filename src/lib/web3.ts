import { createConfig, http } from 'wagmi'
import { mainnet, sepolia, polygon, bsc } from 'wagmi/chains'
import { injected, metaMask, walletConnect } from 'wagmi/connectors'
import { vercelConfig } from './vercel-config'

const projectId = vercelConfig.walletConnectProjectId

export const config = createConfig({
  chains: [mainnet, sepolia, polygon, bsc],
  connectors: [
    injected(),
    metaMask(),
    walletConnect({ projectId }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [polygon.id]: http(),
    [bsc.id]: http(),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
