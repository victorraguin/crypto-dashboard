import { useFetchCryptoList } from '../hooks/useFetchCryptoList'
import { getCurrencySymbol } from '../helpers/currency'
import { useContext, useState } from 'react'
import { CurrencyContext } from '../context/CurrencyContext'
import Image from 'next/image'

export default function CryptoList () {
  const { currency } = useContext(CurrencyContext)
  const [currentPage, setCurrentPage] = useState(1)
  const {
    data: cryptos,
    isLoading,
    error
  } = useFetchCryptoList(currency, currentPage)

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1)
    }
  }

  const handleNextPage = () => {
    setCurrentPage(prev => prev + 1)
  }

  if (error)
    return (
      <div className='w-full p-2 md:p-6 border border-red-200 bg-red-50 rounded-lg mt-5 text-red-600 flex items-center justify-center'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-5 w-5 mr-2'
          viewBox='0 0 20 20'
          fill='currentColor'
        >
          <path
            fillRule='evenodd'
            d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
            clipRule='evenodd'
          />
        </svg>
        Erreur: {error.message}
      </div>
    )

  return (
    <div className='w-full p-3 md:p-6 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl mt-5 shadow-sm'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-xl font-semibold dark:text-white'>
          Top Cryptomonnaies
        </h2>
        <div className='text-sm text-gray-500 dark:text-gray-400'>
          Page {currentPage}
        </div>
      </div>

      {isLoading ? (
        <table className='w-full'>
          <thead>
            <tr className='grid grid-cols-3 w-full border-b border-gray-100 dark:border-gray-700 pb-3'>
              <th className='text-left text-gray-500 dark:text-gray-400 font-medium text-sm'>
                Nom
              </th>
              <th className='text-center text-gray-500 dark:text-gray-400 font-medium text-sm'>
                Prix
              </th>
              <th className='text-center text-gray-500 dark:text-gray-400 font-medium text-sm'>
                Évolution (24h)
              </th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, index) => (
              <tr
                key={index}
                className='grid grid-cols-3 w-full border-b border-gray-50 py-4'
              >
                <td className='text-left flex items-center'>
                  <div className='h-8 w-8 bg-gray-200 rounded-full animate-pulse mr-3'></div>
                  <div className='h-6 bg-gray-200 rounded animate-pulse w-3/4'></div>
                </td>
                <td className='text-center'>
                  <div className='h-6 bg-gray-200 rounded animate-pulse w-1/2 mx-auto'></div>
                </td>
                <td className='text-center'>
                  <div className='h-6 bg-gray-200 rounded animate-pulse w-1/4 mx-auto'></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <>
          <table className='w-full'>
            <thead>
              <tr className='grid grid-cols-3 w-full border-b border-gray-100 dark:border-gray-700 pb-3'>
                <th className='text-left text-gray-500 dark:text-gray-400 font-medium text-sm'>
                  Nom
                </th>
                <th className='text-center text-gray-500 dark:text-gray-400 font-medium text-sm'>
                  Prix
                </th>
                <th className='text-center text-gray-500 dark:text-gray-400 font-medium text-sm'>
                  Évolution (24h)
                </th>
              </tr>
            </thead>
            <tbody>
              {cryptos.map(crypto => (
                <tr
                  key={crypto.id}
                  className='grid grid-cols-3 w-full border-b border-gray-50 py-4 hover:opacity-80 transition-colors duration-150 rounded-md'
                >
                  <td className='text-left font-medium flex items-center'>
                    <Image
                      src={crypto.image}
                      alt={crypto.name}
                      width={32}
                      height={32}
                      className='rounded-full mr-3'
                    />
                    <div>
                      <div className='font-semibold'>{crypto.name}</div>
                      <div className='text-xs text-gray-500'>
                        {crypto.symbol}
                      </div>
                    </div>
                  </td>
                  <td className='text-center font-mono self-center'>
                    {getCurrencySymbol(currency)}
                    {crypto.price.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </td>
                  <td className='text-center self-center'>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        crypto.change24h >= 0
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {crypto.change24h > 0 ? '↑' : '↓'}{' '}
                      {Math.abs(crypto.change24h).toFixed(2)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className='flex justify-between mt-6'>
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-md ${
                currentPage === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
                  : 'bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800'
              } transition-colors duration-200`}
            >
              Page précédente
            </button>
            <button
              onClick={handleNextPage}
              className='px-4 py-2 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800 transition-colors duration-200'
            >
              Page suivante
            </button>
          </div>
        </>
      )}
    </div>
  )
}
