'use client'
import React, { useEffect, useState } from 'react';
import { Eventlist } from '@/components/Eventlist';
import Image from 'next/image';
import MainImage from './MainImage.jpg';
import { ChooseLocation } from '@/components/chooseLocation';
import { Button } from '@/components/ui/button';
import { ChooseDay } from '@/components/ChooseDay';

const EventPage = () => {
  const [isReady, setIsReady] = useState(false)
  const [events, setEvents] = useState([]);
  const [city, setCity] = useState([]);
  const [time, setTime] = useState([]);
  const [date, setDate] = useState([]);
  const [selectedCityState, setSelectedCityState] = useState(null);
  const [selectedDateState, setSelectedDateState] = useState(null)

  useEffect(() => { setIsReady(true)}, [])

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/event');
        const data = await res.json();
        console.log(data);
        setEvents(data);
        const uniqueCities = [...new Set(data.map(event => event.city))];
        const times = [...new Set(data.map(event => event.time))];
        const dates = [...new Set(data.map(event => event.date))];
        setCity(uniqueCities);
        setTime(times);
        setDate(dates);
      } catch (error) {
        console.log(error.message);
      }
    };
    getData();
  }, []);

  
  const handleCitySelection = (cityValue) => {
    const selectedCitys = events.filter((e) => e.city === cityValue)
    setSelectedCityState(selectedCitys)
  }

  const handleDateSelection = (dateValue) => {
    let sortedDates = []
    if (dateValue === 'senaste-datum') {
        sortedDates = [...events].sort((a, b) => new Date(b.date) - new Date(a.date))
    } else if (dateValue === 'tidigast') {
        sortedDates = [...events].sort((a, b) => new Date(a.date) - new Date(b.date))
    }
    setSelectedDateState(sortedDates)
}

const clearLocations = () => {
  setSelectedCityState(null)
}


  if(!isReady) return null
  return (
    <main>
      <div className='flex items-center justify-center gap-10 mt-5'>
        <div className='border p-4'>
          <Image
            src={MainImage}
            width={500}
            height={500}
            alt="Main Event"
          />
        </div>
        <div className='flex justify-center items-center flex-col gap-4'>
          <h1 className='text-2xl'>Book your Event today!</h1>
          <h2 className='text-center'>Choose City and time</h2>
          <ChooseLocation city={city} 
           handleCitySelection={handleCitySelection} clearLocations={clearLocations} />
          <ChooseDay date={date} handleDateSelection={handleDateSelection}/>
          <Button onClick={() => setSelectedCityState(null)}>All Locations</Button>
        </div>
      </div>
      <Eventlist events={events} selectedCityState={selectedCityState} selectedDateState={selectedDateState} />
    </main>
  );
};

export default EventPage;
