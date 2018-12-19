import numeral from 'numeral'

export function vndFormat(value) {
  if (value === 'N/A') return value
  if (value === null) return 'N/A'
  return `${numeral(value).format('0,0')}đ`
}

const dateOptions = {
  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric',
};

const dateOptionsWithSecond = {
  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric',
};

export function dateFormat(created) {
  const date = new Date(created)
  return date.toLocaleDateString('en-US', dateOptions)
}

export function dateFormatForTransactions(created) {
  const date = new Date(created)
  return date.toLocaleDateString('en-US', dateOptionsWithSecond)
}
