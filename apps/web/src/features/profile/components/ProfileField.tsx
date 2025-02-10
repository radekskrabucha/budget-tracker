type ProfileFieldProps = {
  icon: React.ElementType
  label: string
  value: string
}

export const ProfileField: React.FC<ProfileFieldProps> = ({
  icon: Icon,
  label,
  value
}) => (
  <div className="flex items-center gap-2">
    <Icon className="text-muted-foreground size-4 shrink-0" />
    <div className="flex flex-col">
      <span className="text-muted-foreground text-xs">{label}</span>
      <span className="font-medium break-all">{value}</span>
    </div>
  </div>
)
