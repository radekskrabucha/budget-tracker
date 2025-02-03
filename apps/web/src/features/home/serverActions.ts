import {
  fetchWrapper,
  InferResponseType,
  InferRequestType
} from '@budget-tracker/api'
import { appClient } from '~/web/lib/client'
import { getHeaders } from '~/web/utils/headers'

const getDashboardSummary = appClient.dashboard.summary.$get

export type GetDashboardSummaryReq = InferRequestType<
  typeof getDashboardSummary
>['query']

export type GetDashboardSummaryRes = InferResponseType<
  typeof getDashboardSummary
>

export const getUserDashboardSummary = async (req: GetDashboardSummaryReq) => {
  const data = await fetchWrapper(
    getDashboardSummary(
      {
        query: req
      },
      {
        headers: await getHeaders()
      }
    )
  )

  return data
}
