import { headers } from 'next/headers'

export const getHeaders = async () => Object.fromEntries(await headers())
