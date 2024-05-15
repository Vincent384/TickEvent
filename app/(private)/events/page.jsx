'use client'
import React, { useEffect, useState } from 'react'
import { db } from '@/app/firebase.config';
import { addDoc, collection, onSnapshot, query, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Eventlist } from '@/components/Eventlist';
import Image from 'next/image';
import MainImage from './MainImage.jpg'

const EventPage = () => {

    const [events, setEvents] = useState([])

    useEffect(() => {
      const q = query(collection(db, 'events'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const Events = [];
        snapshot.forEach((doc) => {
          Events.push({ id: doc.id, ...doc.data() });
        });
        setEvents(Events);
      });
      return () => unsubscribe();
    }, []);



  return (
      <main>
        <div className='flex items-center justify-center gap-10 mt-5'>
          <div className='border p-4'>
            <Image
            src={MainImage}
            width={500}
            height={500}
            alt={MainImage}
            />
          </div>
          <div className=''>
            <h1 className='text-2xl'>Book your Event today!</h1>
          </div>
        </div>
     <Eventlist
    events={events}/>

    </main>
  )
}

export default EventPage