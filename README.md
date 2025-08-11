# CryptoDefi - Platform DeFi Lengkap 🚀

Platform DeFi komprehensif dengan fitur NFT minting, token swapping, staking, liquidity pools, dan cross-chain bridging. Dibangun dengan Next.js, TypeScript, dan ethers.js dengan desain neomorphism yang memukau.

## ✨ Fitur Utama

- 🔐 **Koneksi Wallet** - Support MetaMask, WalletConnect, dan wallet populer lainnya
- 🎨 **NFT Minting** - Buat dan mint NFT unik dengan metadata custom
- 🔄 **Token Swapping** - Tukar token secara instan dengan fee rendah
- 💧 **Liquidity Pools** - Sediakan likuiditas dan dapatkan trading fees
- 🔒 **Staking** - Stake token untuk mendapatkan passive income
- 🌉 **Cross-Chain Bridge** - Transfer aset antar blockchain berbeda
- 📱 **Mobile Responsive** - Optimized untuk semua device
- 🎨 **Neomorphism Design** - UI modern dengan soft shadows dan depth

## 🚀 Deploy ke Vercel (1-Click)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/cryptodefi&env=NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,NEXT_PUBLIC_ALCHEMY_API_KEY&envDescription=Required%20API%20keys%20for%20Web3%20functionality&envLink=https://github.com/YOUR_USERNAME/cryptodefi/blob/main/VERCEL_DEPLOYMENT.md)

### Environment Variables untuk Vercel

Set environment variables berikut di Vercel Dashboard:

```bash
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_key
NEXT_PUBLIC_INFURA_API_KEY=your_infura_key
```

[📖 Panduan Lengkap Deployment Vercel](VERCEL_DEPLOYMENT.md)

## 🛠 Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Web3**: ethers.js v6, wagmi, viem
- **Styling**: Custom neomorphism design system
- **Deployment**: Vercel-optimized
- **Networks**: Ethereum, Polygon, BSC, Arbitrum

## 🏃‍♂️ Quick Start

### Development

```bash
# Clone repository
git clone <repository-url>
cd cryptodefi

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Edit .env.local dengan API keys Anda

# Run development server
npm run dev
```

### Production Build

```bash
# Build untuk production
npm run build

# Start production server
npm start
```

## 📁 Struktur Project

```
src/
├── app/                 # Next.js app router pages
│   ├── page.tsx        # Dashboard utama
│   ├── nft/            # NFT minting
│   ├── swap/           # Token swapping  
│   ├── liquidity/      # Liquidity pools
│   ├── staking/        # Staking pools
│   ├── bridge/         # Cross-chain bridge
│   └── csstest/        # CSS test page
├── components/         # Reusable components
│   ├── ui/            # UI components
│   ├── Header.tsx     # Navigation
│   ├── WalletConnect.tsx
│   └── MobileNav.tsx  # Mobile navigation
├── contracts/         # Smart contract interfaces
├── lib/              # Utilities dan configurations
│   ├── web3.ts       # Web3 configuration
│   ├── vercel-config.ts # Vercel optimization
│   └── errors.ts     # Error handling
└── globals.css       # Neomorphism styles
```

## 🔧 Konfigurasi API Keys

### 1. WalletConnect Project ID
1. Kunjungi [WalletConnect Cloud](https://cloud.walletconnect.com)
2. Buat account/login
3. Buat project baru
4. Copy Project ID

### 2. Alchemy API Key
1. Kunjungi [Alchemy](https://www.alchemy.com)
2. Buat account gratis
3. Buat app untuk Ethereum Mainnet
4. Copy API key

### 3. Infura API Key (Opsional)
1. Kunjungi [Infura](https://infura.io)
2. Buat account gratis
3. Buat project baru
4. Copy Project ID

## 📱 Fitur Overview

### NFT Minting
- Mint NFT unik dengan metadata custom
- Upload gambar dan set nama, deskripsi
- Support IPFS metadata storage
- Real-time status tracking

### Token Swapping
- Swap token instan dengan kalkulasi harga
- Proteksi slippage
- Support multi-token
- Rate update real-time

### Liquidity Pools
- Add/remove liquidity
- Earn trading fees
- Pool statistics
- Track posisi Anda

### Staking
- Stake token untuk rewards
- Multiple staking pools
- APY calculation real-time
- Lock period management

### Cross-Chain Bridge
- Transfer aset antar chains
- Support network utama
- Transaction tracking
- Fee estimation

## 🎨 Design System

Platform menggunakan custom neomorphism design dengan:
- Soft shadows dan depth effects
- Gradient backgrounds
- Smooth animations
- Responsive design
- Dark/light theme support

## 🔒 Security Features

- Environment variables validation
- Security headers configured
- Input sanitization
- Error boundary protection
- Secure Web3 connections

## 📊 Performance

- Optimized untuk Vercel deployment
- Bundle size optimization
- Image optimization
- Lazy loading components
- CDN delivery

## 🤝 Contributing

1. Fork repository
2. Buat feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push ke branch (`git push origin feature/amazing-feature`)
5. Buat Pull Request

## 📄 License

Project ini menggunakan MIT License - lihat file [LICENSE](LICENSE) untuk detail.

## 🆘 Support & Troubleshooting

### Build Issues
```bash
# Check TypeScript errors
npm run type-check

# Check linting errors  
npm run lint

# Test build locally
npm run build
```

### Deployment Issues
- Check Vercel build logs
- Verify environment variables
- Ensure API keys valid
- Check network connectivity

### Web3 Issues
- Verify wallet connection
- Check network configuration
- Ensure sufficient gas fees
- Validate contract addresses

## 📞 Contact

- **Email**: support@cryptodefi.com
- **Discord**: [Join Community](https://discord.gg/cryptodefi)
- **Documentation**: [Docs Site](https://docs.cryptodefi.com)

---

**Ready to explore DeFi? Deploy sekarang dan mulai trading! 🚀**

Built dengan ❤️ oleh CryptoDefi Team
