import { AlertTriangle, X } from 'lucide-react'
import Button from './Button'
import Card from './Card'

interface ErrorDisplayProps {
  title?: string
  message: string
  onDismiss?: () => void
  onRetry?: () => void
  className?: string
}

export default function ErrorDisplay({ 
  title = 'Error', 
  message, 
  onDismiss, 
  onRetry,
  className 
}: ErrorDisplayProps) {
  return (
    <Card className={`border-[var(--error)]/20 bg-gradient-to-r from-[var(--error)]/5 to-[var(--error)]/10 ${className}`}>
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-[var(--error)]/20 flex items-center justify-center flex-shrink-0">
          <AlertTriangle className="w-5 h-5 text-[var(--error)]" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-[var(--error)]">{title}</h3>
            {onDismiss && (
              <button
                onClick={onDismiss}
                className="p-1 hover:bg-[var(--error)]/10 rounded-md transition-colors"
              >
                <X className="w-4 h-4 text-[var(--error)]" />
              </button>
            )}
          </div>
          
          <p className="text-sm text-[var(--text)] mb-3">{message}</p>
          
          {onRetry && (
            <Button variant="secondary" size="sm" onClick={onRetry}>
              Try Again
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}
