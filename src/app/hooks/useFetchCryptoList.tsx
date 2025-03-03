import { useQuery } from '@tanstack/react-query'
import { getCryptoList } from '../api/cryptocurrency/getCryptoList'
import { CryptoCurrencyType } from '../types/cryptocurrencys'

export const useFetchCryptoList = (currency: string, page: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['cryptoList', currency, page],
    queryFn: () => getCryptoList({ currency, page }),
    refetchInterval: 30000
  })

  if (!data) return { data: [], isLoading, error }

  console.log(data)

  const transformedData = transformData(data)

  return { data: transformedData, isLoading, error }
}

const transformData = (data: any[]): CryptoCurrencyType[] => {
  return data.map(crypto => ({
    id: crypto.id,
    name: crypto.name,
    symbol: crypto.symbol.toUpperCase(),
    price: crypto.current_price,
    change24h: crypto.price_change_percentage_24h,
    image: crypto.image
  }))
}
