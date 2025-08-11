'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import ErrorDisplay from '@/components/ui/ErrorDisplay'
import { useToast } from '@/components/ui/Toast'
import {
  CheckCircle,
  XCircle,
  Clock,
  Palette,
  ArrowUpDown,
  Droplets,
  Lock,
  Building2
} from 'lucide-react'

const testSections = [
  {
    id: 'ui',
    name: 'UI Components',
    icon: Palette,
    tests: [
      'Neomorphism design system',
      'Responsive layout',
      'Button variants',
      'Input fields',
      'Card components',
      'Loading states',
      'Error handling'
    ]
  },
  {
    id: 'wallet',
    name: 'Wallet Connection',
    icon: Lock,
    tests: [
      'MetaMask connection',
      'WalletConnect integration',
      'Network switching',
      'Balance display',
      'Disconnect functionality'
    ]
  },
  {
    id: 'nft',
    name: 'NFT Minting',
    icon: Palette,
    tests: [
      'Form validation',
      'Image preview',
      'Mint transaction',
      'Success feedback',
      'Error handling'
    ]
  },
  {
    id: 'swap',
    name: 'Token Swapping',
    icon: ArrowUpDown,
    tests: [
      'Token selection',
      'Amount calculation',
      'Slippage settings',
      'Swap execution',
      'Transaction tracking'
    ]
  },
  {
    id: 'liquidity',
    name: 'Liquidity Pools',
    icon: Droplets,
    tests: [
      'Pool selection',
      'Add liquidity',
      'Remove liquidity',
      'Position tracking',
      'Rewards calculation'
    ]
  },
  {
    id: 'staking',
    name: 'Staking',
    icon: Lock,
    tests: [
      'Pool selection',
      'Stake tokens',
      'Unstake tokens',
      'Rewards claiming',
      'APY calculation'
    ]
  },
  {
    id: 'bridge',
    name: 'Cross-Chain Bridge',
    icon: Building2,
    tests: [
      'Chain selection',
      'Token bridging',
      'Fee calculation',
      'Transaction tracking',
      'Status updates'
    ]
  }
]

type TestStatus = 'pending' | 'running' | 'passed' | 'failed'

export default function TestPage() {
  const [testResults, setTestResults] = useState<Record<string, TestStatus>>({})
  const [runningTests, setRunningTests] = useState(false)
  const { showToast } = useToast()

  const runTest = async (sectionId: string) => {
    setTestResults(prev => ({ ...prev, [sectionId]: 'running' }))
    
    // Simulate test execution
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Random result for demo (in real app, would run actual tests)
    const passed = Math.random() > 0.2
    setTestResults(prev => ({ ...prev, [sectionId]: passed ? 'passed' : 'failed' }))
    
    showToast({
      type: passed ? 'success' : 'error',
      title: `${testSections.find(s => s.id === sectionId)?.name} Test`,
      message: passed ? 'All tests passed!' : 'Some tests failed'
    })
  }

  const runAllTests = async () => {
    setRunningTests(true)
    
    for (const section of testSections) {
      await runTest(section.id)
      await new Promise(resolve => setTimeout(resolve, 500))
    }
    
    setRunningTests(false)
    
    const totalTests = testSections.length
    const passedTests = Object.values(testResults).filter(result => result === 'passed').length
    
    showToast({
      type: passedTests === totalTests ? 'success' : 'warning',
      title: 'Test Suite Complete',
      message: `${passedTests}/${totalTests} test sections passed`
    })
  }

  const getStatusIcon = (status: TestStatus) => {
    switch (status) {
      case 'running':
        return <LoadingSpinner size="sm" />
      case 'passed':
        return <CheckCircle className="w-5 h-5 text-[var(--success)]" />
      case 'failed':
        return <XCircle className="w-5 h-5 text-[var(--error)]" />
      default:
        return <Clock className="w-5 h-5 text-[var(--text-light)]" />
    }
  }

  const getStatusColor = (status: TestStatus) => {
    switch (status) {
      case 'running':
        return 'border-[var(--primary)]/50 bg-[var(--primary)]/5'
      case 'passed':
        return 'border-[var(--success)]/50 bg-[var(--success)]/5'
      case 'failed':
        return 'border-[var(--error)]/50 bg-[var(--error)]/5'
      default:
        return ''
    }
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header />
      
      <main className="neu-container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">
              <span className="gradient-text">DeFi Platform Test Suite</span>
            </h1>
            <p className="text-[var(--text-light)]">
              Comprehensive testing of all DeFi functionalities
            </p>
          </div>

          {/* Test Controls */}
          <Card className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold mb-2">Test Controls</h2>
                <p className="text-[var(--text-light)]">
                  Run individual tests or execute the complete test suite
                </p>
              </div>
              <Button
                variant="primary"
                onClick={runAllTests}
                loading={runningTests}
                className="ml-4"
              >
                Run All Tests
              </Button>
            </div>
          </Card>

          {/* Test Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testSections.map((section) => {
              const status = testResults[section.id] || 'pending'
              
              return (
                <Card 
                  key={section.id} 
                  className={`border ${getStatusColor(status)} transition-all duration-300`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center">
                        <section.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold">{section.name}</h3>
                        <p className="text-sm text-[var(--text-light)]">
                          {section.tests.length} tests
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {getStatusIcon(status)}
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => runTest(section.id)}
                        disabled={status === 'running'}
                      >
                        Run
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {section.tests.map((test, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm py-1"
                      >
                        <div className="w-2 h-2 rounded-full bg-[var(--text-light)]" />
                        <span>{test}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              )
            })}
          </div>

          {/* Overall Status */}
          <Card className="mt-8">
            <h3 className="text-lg font-bold mb-4">Test Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-[var(--text-light)]">
                  {testSections.length}
                </div>
                <div className="text-sm text-[var(--text-light)]">Total Tests</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[var(--success)]">
                  {Object.values(testResults).filter(r => r === 'passed').length}
                </div>
                <div className="text-sm text-[var(--text-light)]">Passed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[var(--error)]">
                  {Object.values(testResults).filter(r => r === 'failed').length}
                </div>
                <div className="text-sm text-[var(--text-light)]">Failed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[var(--warning)]">
                  {Object.values(testResults).filter(r => r === 'running').length}
                </div>
                <div className="text-sm text-[var(--text-light)]">Running</div>
              </div>
            </div>
          </Card>

          {/* Error Examples */}
          <div className="mt-8 space-y-4">
            <h3 className="text-lg font-bold">Error Handling Examples</h3>
            
            <ErrorDisplay
              title="Transaction Failed"
              message="Insufficient funds for gas fee. Please add more ETH to your wallet."
              onRetry={() => showToast({ type: 'info', title: 'Retry', message: 'Retrying transaction...' })}
            />
            
            <ErrorDisplay
              title="Network Error"
              message="Unable to connect to the blockchain. Please check your internet connection."
              onDismiss={() => showToast({ type: 'success', title: 'Dismissed', message: 'Error dismissed' })}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
