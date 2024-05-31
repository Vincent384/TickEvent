'use client'
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { createContext, useContext, useState } from "react"

export const BookEventContext = createContext();

const BookEventContextProvider = ({ children }) => {
  const [bookedEvents, setbookedEvents] = useState([])

  const router = useRouter()
  const { isLoaded, user } = useUser()
  const { toast } = useToast()
  const [toastMessage, setToastMessage] = useState(null)

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
      
        setToastMessage(data.message)
      
    } catch (error) {
      console.log(error.message)
      setToastMessage(error.message)
    }
  };

  const unbookEvent = async (email,eventId) =>{
    setToastMessage('')
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
          console.log(data.message)

        setbookedEvents((prevEvents)=> prevEvents.filter(event => 
            !(event.email === email && event.eventId === eventId)))  
        setToastMessage(data.message)
          
            return true
    } catch (error) {
        console.log(error.message)
        return false
    }
  }

  const value = {
    bookEvent,
    unbookEvent,
    toastMessage,
    setToastMessage
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
