export const formatAmount = (amount: number, currency = '$') => {
  return `${currency}${formatAmountWithSeparator(amount, ' ', 2)}`
}

export const formatAmountWithSeparator = (
  number: number,
  separator = ' ',
  numOfDecimals?: number
): string => {
  if (!numOfDecimals) {
    return separateNumber(number.toString(), separator)
  }

  const [integer, decimals] = number.toFixed(numOfDecimals).split('.')
  const formattedIntegerPart = separateNumber(integer || '0', separator)

  return `${formattedIntegerPart}.${decimals}`
}

export const separateNumber = (number: string, separator = ' '): string =>
  number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator)
