import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: 'var(--background)',
        surface: 'var(--surface)',
        primary: {
          DEFAULT: 'var(--primary)',
          dark: 'var(--primary-dark)',
        },
        text: {
          DEFAULT: 'var(--text)',
          light: 'var(--text-light)',
        },
        success: 'var(--success)',
        error: 'var(--error)',
        warning: 'var(--warning)',
      },
      boxShadow: {
        'neu-flat': `
          var(--neu-distance) var(--neu-distance) calc(var(--neu-distance) * 2) var(--shadow-dark),
          calc(var(--neu-distance) * -1) calc(var(--neu-distance) * -1) calc(var(--neu-distance) * 2) var(--shadow-light)
        `,
        'neu-inset': `
          inset var(--neu-distance) var(--neu-distance) calc(var(--neu-distance) * 2) var(--shadow-dark),
          inset calc(var(--neu-distance) * -1) calc(var(--neu-distance) * -1) calc(var(--neu-distance) * 2) var(--shadow-light)
        `,
      },
      animation: {
        'spin': 'spin 1s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(102, 126, 234, 0.2)' },
          '50%': { boxShadow: '0 0 30px rgba(102, 126, 234, 0.4)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
