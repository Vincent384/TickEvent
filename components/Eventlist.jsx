'use client'
import { Armchair, Timer } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

export const Eventlist = ({events}) => {
     if(!events){
         return <div className='h-screen flex item-center justify-center'><LoaderCircle /></div>
     }

  return (
    <div className='flex flex-wrap mt-5'>
        {
            events.map(event => (
                <div key={event.id} className='mx-auto p-4 border cursor-pointer hover:bg-slate-100/70'>
                   <Image className='w-[200px] h-[200px] bg-contain' src={event.imageUrl}
                   width={200}
                   height={200}
                   alt={event.imageName} /> 
                    <h1 className='font-bold p-2 border text-center mt-2'>{event.title}</h1>
                   <div className='flex justify-between mt-2'>
                 
                     <Link href={`events/detailpage/${event.id}`}>
                        <Button className='bg-blue-400'>Ticket</Button>    
                     </Link>
                    </div>
                      </div>
            ))
        }
    </div>
  )
}
