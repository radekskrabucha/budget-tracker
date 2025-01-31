import type { Hono } from 'hono'
import { hc } from 'hono/client'
import type {
  ClientResponse,
  InferRequestType,
  InferResponseType
} from 'hono/client'
import type { SuccessStatusCode } from 'hono/utils/http-status'
import type { appRouter, adminRouter } from '~/api/routes'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type HonoClientArgs<T extends Hono<any, any, any>> = Parameters<typeof hc<T>>

export type AdminRouter = typeof adminRouter
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const adminClientBase = hc<AdminRouter>('')
export type AdminClient = typeof adminClientBase
export const adminHC = (...args: HonoClientArgs<AdminRouter>): AdminClient =>
  hc<AdminRouter>(...args)

export type AppRouter = typeof appRouter
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const appClientBase = hc<AppRouter>('')
export type AppClient = typeof appClientBase
export const appHC = (...args: HonoClientArgs<AppRouter>): AppClient =>
  hc<AppRouter>(...args)

export type ApiErrorResponse = {
  message?: string
  [key: string]: unknown
}

export class ApiError<T = unknown> extends Error {
  constructor(
    message: string,
    public status: number,
    public data: T
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

// Helper type to extract successful response type from ClientResponse union
type ExtractSuccessResponse<T> =
  T extends ClientResponse<infer Data, infer Status, infer Format>
    ? Status extends SuccessStatusCode
      ? ClientResponse<Data, Status, Format>
      : never
    : never

type UnionToIntersection<U> = (
  U extends unknown ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never

export async function fetchWrapper<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends ClientResponse<any, any, any>,
  SuccessResponse extends ExtractSuccessResponse<T> = ExtractSuccessResponse<T>
>(
  resPromise: Promise<T>
): Promise<
  UnionToIntersection<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    SuccessResponse extends ClientResponse<infer Data, any, any> ? Data : never
  >
> {
  const response = await resPromise

  if (!response.ok) {
    let errorData: ApiErrorResponse | string
    try {
      errorData = (await response.json()) as ApiErrorResponse
    } catch {
      errorData = await response.text()
    }

    const errorMessage =
      typeof errorData === 'string'
        ? errorData
        : errorData.message || 'API request failed'

    throw new ApiError(errorMessage, response.status, errorData)
  }

  return response.json()
}

export type { InferRequestType, InferResponseType }
