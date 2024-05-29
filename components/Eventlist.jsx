'use client'
import { Armchair, LoaderCircle, Timer, TimerIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

export const Eventlist = ({events}) => {
     if(!events){
         return <div className='h-screen flex item-center justify-center'><LoaderCircle /></div>
     }

  return (
    <div className='flex flex-wrap mt-5 '>
        {
            events.map(event => (
                <div key={event.id} className='mx-auto mb-10 p-4 border cursor-pointer hover:bg-slate-100/70'>
                   <Link href={`events/detailpage/${event.id}`}>
                   <Image className='' src={event.imageUrl}
                   width={300}
                   height={300}
                   alt={event.imageName} /> 
                   </Link>
                    <h1 className='font-bold p-2 border text-center mt-2'>{event.title}</h1>
                   <div className='flex justify-between items-center mt-2'>
                 
                     <Link href={`events/detailpage/${event.id}`}>
                        <Button className='bg-blue-400'>See more</Button>    
                     </Link>
                     <div>
                        <p>{event.city}</p>
                        <p className='mt-1'>{event.date}</p>
                          <div className='flex justify-between mt-1'>
                            <p>{event.time}</p>
                            <TimerIcon/>
                          </div>
                     </div>
                    </div>
                      </div>
            ))
        }
    </div>
  )
}
