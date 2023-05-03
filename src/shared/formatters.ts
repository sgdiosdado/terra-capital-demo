export const currencyFormatter = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'usd',
  currencyDisplay: 'narrowSymbol',
})