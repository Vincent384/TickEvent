'use client'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/app/firebase.config'
import { Armchair, Timer } from 'lucide-react'
import Image from 'next/image'

const DetailsPage = () => {
  const { id } = useParams()
  const [singleEvent, setSingleEvent] = useState(null)

  useEffect(() => {
    const fetchEvent = async () => {
      if (id) {
        const docRef = doc(db, 'events', id)
        const docSnap = await getDoc(docRef)
        
        if (docSnap.exists()) {
          setSingleEvent(docSnap.data())
        } else {
          console.log('No such document!')
        }
      }
    }

    fetchEvent()
  }, [id])

  return (
    <div>
      {singleEvent ? (
        <div className='flex justify-between'>
          <div className=''>
            <Image className=''
            src={singleEvent.imageUrl}
            width={600}
            height={600}
            alt={singleEvent.imageName}/>
          </div>
            <div>
              <div className='flex justify-between'>
                <h1 className='text-4xl font-bold'>{singleEvent.title}</h1>
                <p>{singleEvent.time}</p>
              </div>
              <div>

              </div>
            </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default DetailsPage
