type CryptoListRequest = {
  currency: string
  page: number
}

export async function getCryptoList ({ currency, page }: CryptoListRequest) {
  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=10&page=${page}&sparkline=false`
  )
  const data = await response.json()
  return data
}
