'use client'

import CryptoList from './components/CryptoList'
import Header from './components/Header/Header'

export default function Home () {
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800'>
      <div className='max-w-6xl mx-auto p-2 md:p-8'>
        <main>
          <Header />

          <div className='grid grid-cols-1 gap-6'>
            <div className='lg:col-span-2'>
              <CryptoList />
            </div>
          </div>
        </main>

        <footer className='mt-12 text-center text-gray-500 text-sm'>
          <p>
            © {new Date().getFullYear()} Crypto Dashboard by Victor Rg - Données
            fournies par CoinGecko
          </p>
        </footer>
      </div>
    </div>
  )
}
