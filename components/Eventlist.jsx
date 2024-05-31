'use client'
import { Armchair, LoaderCircle, Timer, TimerIcon } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

export const Eventlist = ({events,selectedCityState,selectedDateState}) => {
     if(!events){
         return <div className='h-screen flex item-center justify-center'><LoaderCircle /></div>
     }

     const [startDate, setStartDate] = useState(new Date())
     
     const isEventUpcoming = (eventDate)=>{
      return new Date(eventDate) < startDate 
     }

     const filteredEvents = (selectedCityState || selectedDateState || events).filter(event => {
      const matchesCity = selectedCityState ? selectedCityState.some(e => e.id === event.id) : true;
      const matchesDate = selectedDateState ? selectedDateState.some(e => e.id === event.id) : true;
      console.log(matchesCity)
      console.log(matchesDate)
      return matchesCity && matchesDate;
  });


  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5 '>
        {
           filteredEvents ? filteredEvents.map(event => (
            <div key={event.id} className={`w-full mx-auto p-4 border ${isEventUpcoming(event.date) ? 'hidden' : 'cursor-pointer'}
              `}>
               <Link href={`events/detailpage/${event.id}`}>
                <div className='w-full aspect-video'>
                <Image className='w-full h-full object-cover' src={event.imageUrl}
                  width={300}
                  height={300}
                  alt={event.imageName} 
                  /> 
                </div>
               </Link>
                <h1 className='font-bold p-2 border text-center mt-2'>{event.title}</h1>
               <div className='flex justify-between items-center mt-2'>
             
                 <Link href={`events/detailpage/${event.id}`}>
                    <Button className={`${isEventUpcoming(event.date) ? '' : 'bg-blue-400'}`}>{`${isEventUpcoming(event.date,event.time) ? 'Passed event' : 'See more'}`}</Button>    
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
            )):
            events.map(event => (
              <div key={event.id} className={`w-full mx-auto p-4 border ${isEventUpcoming(event.date) ? 'hidden' : 'cursor-pointer'}
                `}>
                 <Link href={`events/detailpage/${event.id}`}>
                  <div className='w-full aspect-video'>
                  <Image className='w-full h-full object-cover' src={event.imageUrl}
                    width={300}
                    height={300}
                    alt={event.imageName} 
                    /> 
                  </div>
                 </Link>
                  <h1 className='font-bold p-2 border text-center mt-2'>{event.title}</h1>
                 <div className='flex justify-between items-center mt-2'>
               
                   <Link href={`events/detailpage/${event.id}`}>
                      <Button className={`${isEventUpcoming(event.date) ? '' : 'bg-blue-400'}`}>{`${isEventUpcoming(event.date,event.time) ? 'Passed event' : 'See more'}`}</Button>    
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
