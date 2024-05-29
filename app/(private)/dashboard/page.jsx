'use client'
import { useBookEventContext } from '@/app/context/bookeventcontext'
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const Dashboard = () => {
  const [events, setEvents] = useState([])
  const { unbookEvent } = useBookEventContext()
  const { user, isLoaded } = useUser()

  useEffect(() => {
    if(!isLoaded) return
      try {

        const getEvenst = async () => {
          const res = await fetch(`http://localhost:3000/api/event?email=${user.primaryEmailAddress.emailAddress}`)
          const data = await res.json()
          setEvents(data)
        }
        getEvenst()
      } catch (error) {
        console.log(error.message)
      }
  }, [isLoaded])
  
console.log(events)
  const handleUnbookClick = async(eventId) =>{
     const success = await unbookEvent(user.primaryEmailAddress.emailAddress,eventId)
      if(success){
        setEvents((prevEvents)=> prevEvents.filter((event)=> event.id !== eventId))
      }
  }

  return (
    <div>
      <div className='border h-[500px] bg-slate-100 m-5 rounded-md'>
          <div>
              <div className='flex justify-center'>
                  <h1 className='text-4xl mt-10 mb-5 '>Your Events</h1>
              </div>
              <div>
            {events.length > 0 ? (
              events.map((event, index) => (
                <div key={index} className='flex h-[200px] overflow-hidden justify-between mx-10 items-center border bg-slate-500 rounded-md p-5'>
                  <Image
                    className='object-cover cursor-pointer p-5'
                    src={event.imageUrl}
                    width={300}
                    height={300}
                    alt={event.imageName || 'Event Image'}
                  />
                  <div className='flex gap-10'>
                    <p className='text-2xl text-white'>{event.title}</p>
                    <Button onClick={() => handleUnbookClick(event.id)} className='bg-red-500'>
                      UnBook
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className='text-center mt-10'>No booked events</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


export default Dashboard