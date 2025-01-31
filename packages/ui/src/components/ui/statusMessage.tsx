import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

export type StatusMessageProps = VariantProps<typeof statusMessageVariants> &
  React.ComponentPropsWithRef<'span'>

export const StatusMessage: React.FC<StatusMessageProps> = ({
  className,
  variant,
  children,
  ...props
}) => (
  <span
    className={statusMessageVariants({
      variant,
      className
    })}
    {...props}
  >
    {children}
  </span>
)

export const statusMessageVariants = cva('text-sm', {
  variants: {
    variant: {
      info: 'text-muted-foreground',
      success: 'text-green-500',
      warning: 'text-yellow-400',
      error: 'text-destructive'
    }
  },
  defaultVariants: {
    variant: 'info'
  }
})
