import { LinkProps } from 'next/link'

export const InternalLink: Record<string, LinkProps['href']> = {
  home: '/'
}

export const ownerEmail = 'rskrabucha13@gmail.com'

export const ExternalLink = {
  github: 'https://github.com/radekskrabucha',
  email: `mailto:${ownerEmail}`,
  sourceCode: 'https://github.com/radekskrabucha/budget-tracker'
} as const

export const AppName = 'Budget Tracker'
