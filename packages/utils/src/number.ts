export const intToDecimal = (value: number, decimals = 2) =>
  value / Math.pow(10, decimals)

export const decimalToInt = (value: number, decimals = 2) =>
  Math.round(value * Math.pow(10, decimals))
