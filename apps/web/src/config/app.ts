export const InternalLink = {
  home: '/',
  signUp: '/sign-up',
  signIn: '/sign-in',
  transactions: '/transactions',
  categories: '/categories',
  profile: '/profile'
} as const

export const ownerEmail = 'rskrabucha13@gmail.com'

export const ExternalLink = {
  github: 'https://github.com/radekskrabucha',
  email: `mailto:${ownerEmail}`,
  sourceCode: 'https://github.com/radekskrabucha/budget-tracker'
} as const

export const appName = 'Budget Tracker'
