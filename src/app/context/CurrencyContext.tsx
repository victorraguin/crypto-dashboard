'use client'

import { createContext } from 'react'
import { create } from 'zustand'

interface CurrencyStore {
  currency: string
  setCurrency: (currency: string) => void
}

const useCurrencyStore = create<CurrencyStore>(set => ({
  currency: 'USD',
  setCurrency: currency => set({ currency })
}))

export const CurrencyContext = createContext<{
  currency: string
  setCurrency: (currency: string) => void
}>({
  currency: 'USD',
  setCurrency: () => {}
})

export const useCurrency = () => {
  const { currency, setCurrency } = useCurrencyStore()
  return { currency, setCurrency }
}

export const CurrencyProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const { currency, setCurrency } = useCurrencyStore()

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  )
}
