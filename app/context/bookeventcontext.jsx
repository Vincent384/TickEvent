'use client'
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { createContext, useContext, useState } from "react"

export const BookEventContext = createContext();

const BookEventContextProvider = ({ children }) => {
  const [bookedEvents, setbookedEvents] = useState([])

  const router = useRouter()
  const { isLoaded, user } = useUser()

  const bookEvent = async (id) => {
    try {
      const email = user.primaryEmailAddress.emailAddress
      const booking = {
        email,
        eventId: id,
      };
      setbookedEvents((prevEvents)=> [...prevEvents,booking])
      console.log(booking)

      const res = await fetch('http://localhost:3000/api/booking', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(booking),
      });

      if (!res.ok) {
        throw new Error("Failed to book event")
      }

      const data = await res.json()
      console.log(data)
      if(data.status === 404){
        console.error('failed to book')
        return 
      }
      router.push('/dashboard')
    } catch (error) {
      console.log(error.message)
    }
  };

  const unbookEvent = async (email,eventId) =>{
    try {
        const unbook = {
            email,
            eventId
        }
        console.log(unbook)
        const res = await fetch('http://localhost:3000/api/avbookning',{
            method:'DELETE',
            headers:{'Content-type':'application/json'},
            body:JSON.stringify(unbook)
          })
          
          if(!res.ok){
            throw new Error('Failed to unbook Event')
          }
        
          const data = await res.json()
          console.log(data)

        setbookedEvents((prevEvents)=> prevEvents.filter(event => 
            !(event.email === email && event.eventId === eventId)))  

            return true
    } catch (error) {
        console.log(error.message)
        return false
    }
  }

  const value = {
    bookEvent,
    unbookEvent
  }

  return (
    <BookEventContext.Provider value={value}>
      {children}
    </BookEventContext.Provider>
  )
}

export default BookEventContextProvider

export const useBookEventContext = () => {
  const context = useContext(BookEventContext)

  if (!context) {
    throw new Error('useBookEventContext must be used within a BookEventContextProvider');
  }

  return context
}
