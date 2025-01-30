export const InternalLink = {
  home: '/',
  signUp: '/sign-up',
  signIn: '/sign-in',
  transactions: '/transactions',
  addTransaction: '/transactions/add',
  editTransaction: (id: string) => `/transactions/${id}/edit`,
  categories: '/categories',
  addCategory: '/categories/add',
  editCategory: (id: string) => `/categories/${id}/edit`,
  profile: '/profile',
  changePassword: '/profile/change-password',
  editProfile: '/profile/edit',
  deleteProfile: '/profile/delete'
} as const

export const ownerEmail = 'rskrabucha13@gmail.com'

export const ExternalLink = {
  github: 'https://github.com/radekskrabucha',
  email: `mailto:${ownerEmail}`,
  sourceCode: 'https://github.com/radekskrabucha/budget-tracker'
} as const

export const appName = 'Budget Tracker'
