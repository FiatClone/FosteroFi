# Vercel Deployment Guide - CryptoDefi

## 🚀 Deploy ke Vercel dalam 5 Menit

### 1. Persiapan
Pastikan Anda memiliki:
- Account Vercel (daftar di [vercel.com](https://vercel.com))
- Repository GitHub dengan code ini
- API Keys yang diperlukan

### 2. Environment Variables yang Diperlukan

Buat environment variables berikut di Vercel Dashboard:

```bash
# WAJIB - WalletConnect Project ID
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=xxxxxxxxx

# WAJIB - Alchemy API Key  
NEXT_PUBLIC_ALCHEMY_API_KEY=xxxxxxxxx

# OPSIONAL - Infura API Key
NEXT_PUBLIC_INFURA_API_KEY=xxxxxxxxx
```

### 3. Cara Mendapatkan API Keys

#### WalletConnect Project ID
1. Kunjungi [WalletConnect Cloud](https://cloud.walletconnect.com)
2. Daftar/Login dengan akun Anda
3. Buat project baru
4. Copy Project ID dari dashboard

#### Alchemy API Key
1. Kunjungi [Alchemy](https://alchemy.com)
2. Daftar akun gratis
3. Buat app baru untuk Ethereum Mainnet
4. Copy API key dari dashboard

### 4. Deploy Options

#### Option A: Deploy dari GitHub (Recommended)
1. Push code ke GitHub repository
2. Login ke [Vercel](https://vercel.com)
3. Import repository
4. Tambahkan environment variables
5. Deploy!

#### Option B: Deploy dengan Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Set environment variables
vercel env add NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
vercel env add NEXT_PUBLIC_ALCHEMY_API_KEY

# Redeploy dengan env vars
vercel --prod
```

### 5. Build Commands (Sudah dikonfigurasi otomatis)
- **Build Command**: `npm run build`
- **Install Command**: `npm install`
- **Output Directory**: `.next`
- **Framework**: Next.js

### 6. Domain Setup
Setelah deploy berhasil:
1. Buka Vercel dashboard
2. Pilih project Anda
3. Go to Settings > Domains
4. Tambahkan custom domain (opsional)

### 7. Monitoring & Analytics
Vercel menyediakan:
- Real-time analytics
- Performance monitoring
- Error tracking
- Build logs

### 8. Troubleshooting

#### Build Errors
```bash
# Jika ada error build, cek:
npm run build

# Jika ada TypeScript errors:
npm run type-check

# Jika ada linting errors:
npm run lint
```

#### Environment Variables
- Pastikan semua env vars dimulai dengan `NEXT_PUBLIC_`
- Vercel env vars case-sensitive
- Restart deployment setelah update env vars

#### Performance Issues
- Enable Vercel Analytics di dashboard
- Check bundle size dengan `npm run build`
- Optimize images jika diperlukan

### 9. Security Checklist
- ✅ Environment variables setup dengan benar
- ✅ No secrets di code
- ✅ HTTPS enabled (automatic di Vercel)
- ✅ Security headers configured

### 10. Post-Deployment
1. Test semua fitur Web3
2. Verify wallet connection
3. Test NFT minting
4. Check swap functionality
5. Verify mobile responsiveness

## 🔗 Useful Links
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [WalletConnect Setup](https://docs.walletconnect.com)
- [Alchemy Docs](https://docs.alchemy.com)

## 📞 Support
Jika ada masalah deployment, check:
1. Vercel build logs
2. Browser console untuk errors
3. Network tab untuk failed requests

---

**Ready to deploy? Click the button below:**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/cryptodefi&env=NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,NEXT_PUBLIC_ALCHEMY_API_KEY&envDescription=Required%20API%20keys%20for%20Web3%20functionality&envLink=https://github.com/YOUR_USERNAME/cryptodefi/blob/main/VERCEL_DEPLOYMENT.md)
