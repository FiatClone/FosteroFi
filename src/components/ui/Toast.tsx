'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { CheckCircle, AlertTriangle, Info, X } from 'lucide-react'
import { clsx } from 'clsx'

type ToastType = 'success' | 'error' | 'info' | 'warning'

interface Toast {
  id: string
  type: ToastType
  title: string
  message?: string
  duration?: number
}

interface ToastContextType {
  showToast: (toast: Omit<Toast, 'id'>) => void
  hideToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Date.now().toString()
    const newToast = { ...toast, id }
    
    setToasts(prev => [...prev, newToast])
    
    // Auto dismiss after duration
    setTimeout(() => {
      hideToast(id)
    }, toast.duration || 5000)
  }, [])

  const hideToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={hideToast} />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

function ToastContainer({ toasts, onDismiss }: { toasts: Toast[]; onDismiss: (id: string) => void }) {
  if (toasts.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  )
}

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: (id: string) => void }) {
  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-[var(--success)]" />
      case 'error':
        return <AlertTriangle className="w-5 h-5 text-[var(--error)]" />
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-[var(--warning)]" />
      case 'info':
        return <Info className="w-5 h-5 text-[var(--primary)]" />
      default:
        return <Info className="w-5 h-5 text-[var(--primary)]" />
    }
  }

  const getBorderColor = () => {
    switch (toast.type) {
      case 'success':
        return 'border-[var(--success)]/20'
      case 'error':
        return 'border-[var(--error)]/20'
      case 'warning':
        return 'border-[var(--warning)]/20'
      case 'info':
        return 'border-[var(--primary)]/20'
      default:
        return 'border-[var(--primary)]/20'
    }
  }

  const getBgColor = () => {
    switch (toast.type) {
      case 'success':
        return 'from-[var(--success)]/5 to-[var(--success)]/10'
      case 'error':
        return 'from-[var(--error)]/5 to-[var(--error)]/10'
      case 'warning':
        return 'from-[var(--warning)]/5 to-[var(--warning)]/10'
      case 'info':
        return 'from-[var(--primary)]/5 to-[var(--primary)]/10'
      default:
        return 'from-[var(--primary)]/5 to-[var(--primary)]/10'
    }
  }

  return (
    <div className={clsx(
      'neu-card p-4 min-w-0 bg-gradient-to-r border',
      getBorderColor(),
      getBgColor(),
      'animate-in slide-in-from-right duration-300'
    )}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm">{toast.title}</h4>
          {toast.message && (
            <p className="text-sm text-[var(--text-light)] mt-1">{toast.message}</p>
          )}
        </div>
        
        <button
          onClick={() => onDismiss(toast.id)}
          className="p-1 hover:bg-white/10 rounded-md transition-colors flex-shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
