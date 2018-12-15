import numeral from 'numeral'

export function vndFormat(value) {
  if (value === 'N/A') return value
  if (value === null) return 'N/A'
  return `${numeral(value).format('0,0')}đ`
}

const dateOptions = {
  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric',
};

export function dateFormat(created) {
  const date = new Date(created)
  return date.toLocaleDateString('en-US', dateOptions)
}

const dateTransactionHistory = {
  year: 'numeric', month: 'long', day: 'numeric',
}

export function dateFormatForTransactions(created) {
  const date = new Date(created)
  return date.toLocaleDateString('en-US', dateTransactionHistory)
}
