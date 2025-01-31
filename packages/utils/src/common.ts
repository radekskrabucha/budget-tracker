export const nonNullable = <T>(value: T): value is NonNullable<T> =>
  value != null

export const waitFor = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms))

export const isEmpty = <T>(value: T | null | undefined): boolean => {
  if (value === null || value === undefined) {
    return true
  }
  if (typeof value === 'string') {
    return value.trim().length === 0
  }
  if (Array.isArray(value)) {
    return value.length === 0
  }
  if (typeof value === 'object') {
    return Object.keys(value).length === 0
  }

  return false
}
