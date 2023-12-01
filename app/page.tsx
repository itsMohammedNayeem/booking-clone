import { trending_data } from '@/data/trending'

export default function Home() {
  return (
    <main className='bg-darkPowderBlue'>
      <section className='mx-auto max-w-7xl p-6'>
        <h2 className='text-5xl font-bold text-white'>Find your next stay</h2>
        <h3 className='py-5 text-xl text-white'>Search low prices on hotels, homes, flights, and much more...</h3>
      </section>

      <section className='m-4 -mb-14 mt-0 px-2 lg:px-4'></section>
      <section className='mx-auto mt-10 max-w-7xl rounded-t-lg bg-white p-6'>
        <div className='pt-5'>
          <h3 className='text-xl font-bold'>Trending destinations</h3>
          <p className='font-light'>Popular destinations for your next trip</p>
        </div>

        <div className='flex space-x-4 overflow-x-scroll py-5'>
          {trending_data.map(item => (
            <div key={item.id} className='shrink-0 cursor-pointer space-y-1'>
              <img key={item.id} src={item.src} alt={item.title} className='h-72 w-80 rounded-lg object-cover pb-2' />
              <p className='text-sm font-bold'>{item.title}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
