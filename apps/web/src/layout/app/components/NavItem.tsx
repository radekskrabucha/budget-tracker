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
      className="hover:bg-muted hover:text-muted-foreground flex flex-col items-center gap-1 rounded-md px-4 py-2 transition-colors max-md:px-2 md:flex-row md:gap-3"
    >
      <Icon className="h-5 w-5" />
      <span className="text-xs md:text-sm">{label}</span>
    </Link>
  </li>
)
