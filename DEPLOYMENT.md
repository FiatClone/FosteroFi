# Deployment Guide for CryptoDefi

This guide will help you deploy the CryptoDefi platform to Vercel.

## Prerequisites

- Node.js 18+
- Vercel account
- WalletConnect Project ID
- Alchemy API Key
- Infura API Key (optional)

## Environment Variables

You'll need to set up the following environment variables:

### Required Variables

```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_key_here
NEXT_PUBLIC_INFURA_API_KEY=your_infura_key_here
```

### Getting API Keys

#### 1. WalletConnect Project ID
1. Visit [WalletConnect Cloud](https://cloud.walletconnect.com)
2. Create an account or sign in
3. Create a new project
4. Copy the Project ID from the project dashboard

#### 2. Alchemy API Key
1. Visit [Alchemy](https://www.alchemy.com)
2. Create a free account
3. Create a new app for Ethereum Mainnet
4. Copy the API key from the app dashboard

#### 3. Infura API Key (Optional)
1. Visit [Infura](https://infura.io)
2. Create a free account
3. Create a new project
4. Copy the Project ID as your API key

## Deployment Steps

### Option 1: One-Click Deploy (Recommended)

1. Click the deploy button:
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/cryptodefi)

2. Connect your GitHub account
3. Import the repository
4. Add environment variables in the Vercel dashboard
5. Deploy!

### Option 2: Manual Deployment

1. **Clone and prepare the repository:**
   ```bash
   git clone <your-repo-url>
   cd cryptodefi
   npm install
   ```

2. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

3. **Login to Vercel:**
   ```bash
   vercel login
   ```

4. **Deploy to Vercel:**
   ```bash
   vercel --prod
   ```

5. **Set environment variables:**
   ```bash
   vercel env add NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
   vercel env add NEXT_PUBLIC_ALCHEMY_API_KEY
   vercel env add NEXT_PUBLIC_INFURA_API_KEY
   ```

6. **Redeploy with environment variables:**
   ```bash
   vercel --prod
   ```

## Smart Contract Configuration

Before deploying, update the contract addresses in `src/contracts/interfaces.ts`:

```typescript
export const CONTRACT_ADDRESSES = {
  NFT: "0x...", // Your deployed NFT contract
  STAKING: "0x...", // Your deployed staking contract
  LIQUIDITY_POOL: "0x...", // Your deployed DEX contract
  TOKEN_A: "0x...", // First token address
  TOKEN_B: "0x...", // Second token address
}
```

## Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test wallet connection functionality
- [ ] Confirm environment variables are set
- [ ] Check mobile responsiveness
- [ ] Test on different networks (mainnet, testnet)
- [ ] Verify smart contract interactions
- [ ] Set up custom domain (optional)
- [ ] Configure analytics (optional)

## Troubleshooting

### Common Issues

1. **Build Errors:**
   - Ensure all dependencies are installed: `npm install`
   - Check for TypeScript errors: `npm run type-check`
   - Verify environment variables are set correctly

2. **Wallet Connection Issues:**
   - Verify WalletConnect Project ID is correct
   - Check if the project ID is active in WalletConnect dashboard
   - Ensure the domain is added to allowed origins

3. **RPC Connection Errors:**
   - Verify Alchemy/Infura API keys are correct
   - Check if the keys have appropriate permissions
   - Ensure rate limits aren't exceeded

4. **Smart Contract Errors:**
   - Verify contract addresses are correct for the target network
   - Check if contracts are deployed and verified
   - Ensure ABI matches the deployed contracts

### Performance Optimization

1. **Enable caching:**
   ```bash
   vercel env add NEXT_PUBLIC_VERCEL_ANALYTICS_ID your_analytics_id
   ```

2. **Add custom domain:**
   - Go to Vercel dashboard
   - Navigate to your project
   - Add custom domain in Settings > Domains

3. **Enable analytics:**
   - Install Vercel Analytics: `npm install @vercel/analytics`
   - Add to your layout component

## Security Considerations

1. **Environment Variables:**
   - Never commit `.env` files to version control
   - Use Vercel's environment variable system
   - Keep API keys secure and rotate them regularly

2. **Smart Contract Security:**
   - Audit contracts before deployment
   - Use established patterns and libraries
   - Implement proper access controls

3. **Frontend Security:**
   - Validate all user inputs
   - Implement proper error handling
   - Use HTTPS for all API calls

## Monitoring and Maintenance

1. **Set up monitoring:**
   - Use Vercel Analytics for performance monitoring
   - Set up error tracking (Sentry recommended)
   - Monitor smart contract events

2. **Regular updates:**
   - Keep dependencies updated
   - Monitor for security vulnerabilities
   - Update smart contract addresses as needed

3. **Backup strategy:**
   - Regular code backups to GitHub
   - Document all configuration changes
   - Keep environment variable backups secure

## Support

For deployment issues:
1. Check Vercel documentation
2. Review Next.js deployment guide
3. Contact support team
4. Join community Discord for help

---

**Note:** This is a comprehensive DeFi platform. Ensure you comply with all relevant regulations in your jurisdiction before deploying to production.
