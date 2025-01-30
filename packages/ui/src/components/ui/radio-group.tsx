'use client'

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { Circle } from 'lucide-react'
import * as React from 'react'
import { cn } from '~/utils/styles.js'

type RadioGroupProps<T extends string = string> = Omit<
  React.ComponentProps<typeof RadioGroupPrimitive.Root>,
  'defaultValue' | 'value' | 'onValueChange'
> & {
  defaultValue?: T
  value?: T
  onValueChange?: (value: T) => void
}

function RadioGroup<T extends string = string>({
  className,
  defaultValue,
  value,
  onValueChange,
  ...props
}: RadioGroupProps<T>) {
  return (
    <RadioGroupPrimitive.Root
      className={cn('grid gap-2', className)}
      defaultValue={defaultValue}
      value={value}
      onValueChange={onValueChange as (value: string) => void}
      {...props}
    />
  )
}
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        'border-primary text-primary focus-visible:ring-ring aspect-square h-4 w-4 rounded-full border shadow focus:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="fill-primary h-3.5 w-3.5" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
