import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import QueryClientProvider from './providers/QueryClient'
import './globals.css'
import { CurrencyProvider } from './context/CurrencyContext'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Crypto Dashboard - Victor Rg',
  description: 'Crypto Dashboard by Victor Rg'
}

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <QueryClientProvider>
      <CurrencyProvider>
        <html lang='en' className='dark'>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
          >
            {children}
          </body>
        </html>
      </CurrencyProvider>
    </QueryClientProvider>
  )
}
