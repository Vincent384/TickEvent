'use client'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Armchair, ArmchairIcon, LoaderCircle, Timer, TimerIcon } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'
import { useBookEventContext } from '@/app/context/bookeventcontext'

const DetailsPage = () => {
  const { id } = useParams()
  const [singleEvent, setSingleEvent] = useState(null)
  const [seats, setSeats] = useState(null)
  const [attendees, setAttendees] = useState([])
  const [avaliableSeatsLeft, setAvaliableSeatsLeft] = useState(0)
  const { isLoaded,user} = useUser()


  const { bookEvent } = useBookEventContext()


  useEffect(() => {
    if(!isLoaded) return
    const getData =async()=>{
      try {
        const res = await fetch(`http://localhost:3000/api/event/${id}?email=${user.primaryEmailAddress.emailAddress}`)
        const data = await res.json()
        setSingleEvent(data)
        console.log(data)
        const totalSeats = parseInt(data.seats,10)
        const availableSeats = totalSeats - data.attendees.length
        setAvaliableSeatsLeft(availableSeats)
      } catch (error) {
        console.log(error.message)            
      }
            }
  getData()
  },[isLoaded])
  

  const handleClickBooking = async () => {
    if (id) {

      await bookEvent(id);
    }
  }

  return (
    <div className='border m-4 rounded'>
      {singleEvent ? (
        <div className='flex p-4'>
          <div className=''>
            <Image className='object-cover h-full w-full cursor-pointer '
            src={singleEvent.imageUrl}
            width={300}
            height={300}
            alt={singleEvent.imageName}/>
          </div>
            <div className='p-7'>
              <div className='flex items-center'>
                <h1 className='text-4xl font-bold'>{singleEvent.title}</h1>
              </div>
                <div className='mt-3'>
                  <p>{singleEvent.description}</p>
                </div>
                  <div className='flex justify-between mt-10 items-center'>
                      <div>
                        {
                          avaliableSeatsLeft > 0 ?
                    
                          <Button onClick={handleClickBooking}>Book now</Button>
                       :(
                             <Link href=''>
                             <Button>Full</Button>
                           </Link>
                        )
                        }
                      </div>
                      <div className='flex gap-4 text-lg'>
                        <p className=''>{singleEvent.time}</p>
                        <TimerIcon />
                        <div className='flex gap-4 items-center'>
                          {
                            avaliableSeatsLeft > 0 ? (
                              <p>{avaliableSeatsLeft + ' seats left'}</p>
                            ) :
                            <p>Full</p> }
                          
                          <ArmchairIcon />
                        </div>
                      </div>
                  </div>
              <div className='mt-10'>
                      <div className='flex justify-end gap-4 text-xl font-bold'>
                        <p>{singleEvent.city}</p>
                        <p>{singleEvent.date}</p>
                      </div>
              </div>
            </div>
        </div>
      ) : (
        <p className='h-screen flex justify-center items-center spin'><LoaderCircle /></p>
      )}
    </div>
  )
}

export default DetailsPage
