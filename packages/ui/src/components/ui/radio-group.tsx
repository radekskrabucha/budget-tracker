'use client'

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { Circle } from 'lucide-react'
import * as React from 'react'
import { cn } from '~/utils/styles.js'

type RadioGroupProps<T extends string = string> = Omit<
  React.ComponentPropsWithRef<typeof RadioGroupPrimitive.Root>,
  'defaultValue' | 'value' | 'onValueChange'
> & {
  defaultValue?: T
  value?: T
  onValueChange?: (value: T) => void
}

export function RadioGroup<T extends string = string>({
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

type RadioGroupItemProps = React.ComponentPropsWithRef<
  typeof RadioGroupPrimitive.Item
>

export const RadioGroupItem: React.FC<RadioGroupItemProps> = ({
  className,
  ...props
}) => (
  <RadioGroupPrimitive.Item
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
