import * as LabelPrimitive from '@radix-ui/react-label'
import * as React from 'react'
import { cn } from '~/utils/styles.js'

export type LabelProps = React.ComponentPropsWithRef<typeof LabelPrimitive.Root>

export const Label: React.FC<LabelProps> = ({ className, ...props }) => (
  <LabelPrimitive.Root
    className={cn(
      'text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
      className
    )}
    {...props}
  />
)
