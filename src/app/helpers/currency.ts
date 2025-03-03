import { currencyList } from '../lib/constant'

export const getCurrencySymbol = (currency: string) => {
  const currencyData = currencyList.find(c => c.name === currency)
  return currencyData ? currencyData.symbol : ''
}
