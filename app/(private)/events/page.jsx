'use client'
import React, { useEffect, useState } from 'react'
import { Eventlist } from '@/components/Eventlist';
import Image from 'next/image';
import MainImage from './MainImage.jpg'
import { ChooseLocation } from '@/components/chooseLocation';



const EventPage = () => {

    const [events, setEvents] = useState([])
    const [city, setCity] = useState([])
    const [selectedCityState, setSelectedCityState] = useState('')

    useEffect(() => {
      const getData =async()=>{
        try {
          const res = await fetch('http://localhost:3000/api/event')
          const data = await res.json()
          console.log(data)
          setEvents(data)
          
          const uniqueCities = [...new Set(data.map(event => event.city))]
          setCity(uniqueCities)
          console.log(city)
        } catch (error) {
          console.log(error.message)            
        }
              }
    getData()
    },[])
    
const handleCitySelection = (cityValue) =>{
  setSelectedCityState(cityValue)
  console.log(cityValue)
}

  return (
      <main>
        <div className='flex items-center justify-center gap-10 mt-5'>
          <div className='border p-4'>
            <Image className=''
            src={MainImage}
            width={500}
            height={500}
            alt={MainImage}
            />
          </div>
          <div className='flex justify-center items-center flex-col gap-4'>
            <h1 className='text-2xl'>Book your Event today!</h1>
              <h2 className='text-center'>Choose City and time</h2>
              <ChooseLocation city={city} handleCitySelection={handleCitySelection}/>
          </div>
        </div>
     <Eventlist
    events={events}/>

    </main>
  )
}

export default EventPage