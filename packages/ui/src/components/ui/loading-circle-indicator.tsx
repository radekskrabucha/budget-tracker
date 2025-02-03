import * as React from 'react'
import { cn } from '~/utils/styles.js'

export const LoadingCircleIndicator: React.FC<
  React.ComponentPropsWithRef<'div'>
> = ({ className, ...props }) => (
  <div
    className={cn(
      'inline-block size-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent',
      className
    )}
    role="status"
    {...props}
  />
)
