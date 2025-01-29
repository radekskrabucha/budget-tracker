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
      className="hover:bg-muted hover:text-muted-foreground flex items-center gap-3 rounded-md px-4 py-2 transition-colors"
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </Link>
  </li>
)
