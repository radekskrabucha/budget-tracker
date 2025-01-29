import Link from 'next/link'

type NavItemProps = {
  href: string
  label: string
  icon: React.ElementType
}

export const NavItem = ({ href, label, icon: Icon }: NavItemProps) => (
  <li>
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-muted hover:text-muted-foreground transition-colors"
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </Link>
  </li>
)
