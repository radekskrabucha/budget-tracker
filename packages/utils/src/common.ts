export const nonNullable = <T>(value: T): value is NonNullable<T> =>
  value != null

export const waitFor = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms))
