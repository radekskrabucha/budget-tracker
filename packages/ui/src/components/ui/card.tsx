import * as React from 'react'
import { cn } from '~/utils/styles.js'

type CardProps = React.ComponentPropsWithRef<'div'>

export const Card: React.FC<CardProps> = ({ className, ...props }) => (
  <div
    className={cn(
      'bg-card text-card-foreground border-border rounded-xl border shadow',
      className
    )}
    {...props}
  />
)

type CardHeaderProps = React.ComponentPropsWithRef<'div'>

export const CardHeader: React.FC<CardHeaderProps> = ({
  className,
  ...props
}) => (
  <div
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
)

type CardTitleProps = React.ComponentPropsWithRef<'div'>

export const CardTitle: React.FC<CardTitleProps> = ({
  className,
  ...props
}) => (
  <div
    className={cn('leading-none font-semibold tracking-tight', className)}
    {...props}
  />
)

type CardDescriptionProps = React.ComponentPropsWithRef<'div'>

export const CardDescription: React.FC<CardDescriptionProps> = ({
  className,
  ...props
}) => (
  <div
    className={cn('text-muted-foreground text-sm', className)}
    {...props}
  />
)

type CardContentProps = React.ComponentPropsWithRef<'div'>

export const CardContent: React.FC<CardContentProps> = ({
  className,
  ...props
}) => (
  <div
    className={cn('p-6 pt-0', className)}
    {...props}
  />
)

type CardFooterProps = React.ComponentPropsWithRef<'div'>

export const CardFooter: React.FC<CardFooterProps> = ({
  className,
  ...props
}) => (
  <div
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
)
