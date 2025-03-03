export type CryptoCurrencyType = {
  id: string
  name: string
  symbol: string
  price: number
  change24h: number
  image: string
}

export type CryptoCurrencyListResponse = CryptoCurrencyType & {
  current_price: number
  price_change_percentage_24h: number
  image: string
}
