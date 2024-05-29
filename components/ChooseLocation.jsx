import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

export const ChooseLocation = ({city,handleCitySelection}) => {

  const [selectedCity, setSelectedCity] = useState('')

const handleClickSelection = (value)=>{
  setSelectedCity(value)
  handleCitySelection(value)
}

    return (
    <div >      
    <Select value={selectedCity} onValueChange={handleClickSelection}>
    <SelectTrigger className="w-[180px]">
      <SelectValue placeholder="City" />
    </SelectTrigger>
    <SelectContent>
 {
   city.map((cityName) => (
       <SelectItem key={cityName} value={cityName}>{cityName}</SelectItem>
    )) 
}
    </SelectContent>
    </Select>
    </div>
)
}
