'use client'
import { currencyList } from '@/app/lib/constant'
import { useContext } from 'react'
import { CurrencyContext } from '@/app/context/CurrencyContext'

export default function Header () {
  const { currency, setCurrency } = useContext(CurrencyContext)

  return (
    <header className='mb-8'>
      <div className='flex flex-col md:flex-row items-center min-w-full border-b border-gray-100 dark:border-gray-800 pb-6'>
        <div className='flex items-center'>
          <div className='bg-blue-600 dark:bg-blue-500 text-white p-2 rounded-lg mr-3'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
          </div>
          <h1 className='text-2xl font-bold dark:text-white'>
            Crypto Dashboard
          </h1>
        </div>

        <div className='flex flex-row mt-4 md:mt-0 md:ml-auto gap-2 items-center'>
          <span className='text-sm text-gray-500 dark:text-gray-400 mr-2'>
            Devise:
          </span>
          {currencyList.map(curr => (
            <button
              key={curr.name}
              onClick={() => setCurrency(curr.name)}
              className={`${
                currency === curr.name
                  ? 'bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-800'
                  : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-blue-900 dark:hover:text-blue-300 dark:hover:border-blue-800'
              } px-4 py-2 rounded-md font-medium transition-colors duration-200`}
            >
              {curr.symbol} {curr.name}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}
