import { appHC } from '@budget-tracker/api'
import { envClient } from '~/web/utils/env/client'

export const appClient = appHC(envClient.NEXT_PUBLIC_API_URL)
