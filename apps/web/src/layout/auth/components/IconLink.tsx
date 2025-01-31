import Link from 'next/link'

type IconLinkProps = {
  href: string
  icon: React.ReactNode
  label: string
}

export const IconLink: React.FC<IconLinkProps> = ({ href, icon, label }) => (
  <Link
    href={href}
    target="_blank"
    className="text-muted-foreground hover:text-primary transition-colors"
  >
    {icon}
    <span className="sr-only">{label}</span>
  </Link>
)
