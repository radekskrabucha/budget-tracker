import type { LucideIcon } from 'lucide-react'

type EmptyStateProps = {
  icon?: LucideIcon
  title: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  action
}) => (
  <div className="border-border bg-card flex flex-col items-center justify-center gap-4 rounded-lg border p-8 text-center">
    {Icon && (
      <div className="bg-muted flex size-12 items-center justify-center rounded-full">
        <Icon className="text-muted-foreground size-6" />
      </div>
    )}
    <div className="flex max-w-[280px] flex-col gap-1">
      <h3 className="text-lg font-semibold">{title}</h3>
      {description && (
        <p className="text-muted-foreground text-sm">{description}</p>
      )}
    </div>
    {action}
  </div>
)
