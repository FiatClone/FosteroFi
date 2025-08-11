import { forwardRef } from 'react'
import { clsx } from 'clsx'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-[var(--text)]">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={clsx(
            'neu-input w-full',
            error && 'border border-[var(--error)]',
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-sm text-[var(--error)]">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
