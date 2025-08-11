import { forwardRef } from 'react'
import { clsx } from 'clsx'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass'
  padding?: 'sm' | 'md' | 'lg'
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', padding = 'md', children, ...props }, ref) => {
    const baseClasses = 'rounded-2xl'
    
    const variants = {
      default: 'neu-card',
      glass: 'glass-effect p-6'
    }
    
    const paddings = {
      sm: variant === 'default' ? 'p-4' : '',
      md: variant === 'default' ? 'p-6' : '',
      lg: variant === 'default' ? 'p-8' : ''
    }

    return (
      <div
        ref={ref}
        className={clsx(
          baseClasses,
          variants[variant],
          variant === 'default' && paddings[padding],
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

export default Card
