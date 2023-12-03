import { fetchResults } from '@/lib/fetchResults'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type Props = {
  searchParams: SearchParams
}

export type SearchParams = {
  url: URL
  group_adults: string
  group_children: string
  no_rooms: string
  checkin: string
  checkout: string
}

async function SearchPage({ searchParams }: Props) {
  if (!searchParams.url) return notFound()

  const results = await fetchResults(searchParams)

  if (!results) return <div>No results...</div>

  return (
    <section>
      <div className='mx-auto max-w-7xl p-6 lg:px-8'>
        <h1 className='pb-3 text-4xl font-bold'>Your Trip Results</h1>

        <h2 className='pb-3'>
          Dates of trip:
          <span className='ml-2 italic'>
            {searchParams.checkin} to {searchParams.checkout}
          </span>
        </h2>

        <hr className='mb-5' />

        <h3 className='text-xl font-semibold'>{results.content.total_listings}</h3>

        <div className='mt-5 space-y-2'>
          {results.content.listings.map((item, i) => (
            <div key={i} className='flex justify-between space-x-4 space-y-2 rounded-lg border p-5'>
              <img src={item.url} alt='image of property' className='h-44 w-44 rounded-lg' />

              <div className='flex flex-1 justify-between space-x-5'>
                <div>
                  <Link href={item.link} className='font-bold text-blue-500 hover:text-blue-600 hover:underline'>
                    {item.title}
                  </Link>
                  <p className='text-xs'>{item.description}</p>
                </div>

                <div className='flex flex-col justify-between'>
                  <div className='flex items-start justify-end space-x-2 text-right'>
                    <div>
                      <p className='font-bold'>{item.rating_word}</p>
                      <p className='text-xs'>{item.rating_count}</p>
                    </div>

                    <p className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-900 text-sm font-bold text-white'>
                      {item.rating || 'N/A'}
                    </p>
                  </div>

                  <div className='text-right'>
                    <p className='text-xs '>{item.booking_metadata}</p>
                    <p className='text-2xl font-bold'>{item.price}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SearchPage
