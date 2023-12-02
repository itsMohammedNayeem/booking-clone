'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { BedDoubleIcon, CalendarIcon } from 'lucide-react'
import { PopoverTrigger } from '@radix-ui/react-popover'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { Popover, PopoverContent } from './ui/popover'
import { Calendar } from './ui/calendar'

export const formSchema = z.object({
  location: z.string().min(2).max(50),
  dates: z.object({
    from: z.date(),
    to: z.date()
  }),
  adults: z
    .string()
    .min(1, {
      message: 'Please select atleast 1 adult'
    })
    .max(12, {
      message: 'Max 12 adults occupancy per room'
    }),
  children: z.string().min(0).max(12, {
    message: 'Please select at least 1 room'
  }),
  rooms: z.string().min(1, {
    message: 'Please select at least 1 room'
  })
})

const SearchForm = () => {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: '',
      dates: {
        from: undefined,
        to: undefined
      },
      adults: '1',
      children: '0',
      rooms: '1'
    }
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col items-center justify-center space-x-0 space-y-4 rounded-lg lg:mx-auto lg:max-w-6xl lg:flex-row lg:space-x-2 lg:space-y-0'>
        <div className='grid w-full items-center gap-1.5 lg:max-w-sm'>
          <FormField
            control={form.control}
            name='location'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='flex text-white'>
                  Location
                  <BedDoubleIcon className='ml-2 h-4 w-4 text-white' />
                </FormLabel>
                <FormMessage />

                <FormControl>
                  <Input {...field} placeholder='London, UK' />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className='grid w-full flex-1 items-center gap-1.5 lg:max-w-sm'>
          <FormField
            control={form.control}
            name='dates'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel className='flex text-white'>
                  Dates
                  <CalendarIcon className='ml-2 h-4 w-4 text-white' />
                </FormLabel>
                <FormMessage />

                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        id='date'
                        name='dates'
                        variant={'outline'}
                        className={cn(
                          'w-full justify-start text-left font-normal lg:w-[300px]',
                          !field.value.from && 'text-muted-foreground'
                        )}>
                        <CalendarIcon className='mr-3 h-4 w-4 opacity-50' />
                        {field.value?.from ? (
                          field.value?.to ? (
                            <>
                              {format(field.value?.from, 'LLL dd, y')} - {format(field.value?.to, 'LLL dd, y')}
                            </>
                          ) : (
                            format(field.value?.from, 'LLL dd, y')
                          )
                        ) : (
                          <span>Select your dates</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>

                  <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar
                      initialFocus
                      mode='range'
                      selected={field.value}
                      defaultMonth={field.value.from}
                      onSelect={field.onChange}
                      numberOfMonths={2}
                      disabled={date => date < new Date(new Date().setHours(0, 0, 0, 0))}
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
        </div>

        <div className='flex w-full items-center space-x-2'>
          <div className='grid flex-1 items-center'>
            <FormField
              control={form.control}
              name='adults'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel className='text-white'>Adults</FormLabel>
                  <FormMessage />

                  <FormControl>
                    <Input placeholder='Adults' {...field} type='number' />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className='grid flex-1 items-center'>
            <FormField
              control={form.control}
              name='children'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel className='text-white'>Children</FormLabel>
                  <FormMessage />

                  <FormControl>
                    <Input placeholder='Children' {...field} type='number' />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className='grid flex-1 items-center'>
            <FormField
              control={form.control}
              name='rooms'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel className='text-white'>Rooms</FormLabel>
                  <FormMessage />

                  <FormControl>
                    <Input placeholder='Rooms' {...field} type='number' />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className='mt-auto'>
            <Button type='submit' className='bg-blue-500 text-base'>
              Search
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}

export default SearchForm
