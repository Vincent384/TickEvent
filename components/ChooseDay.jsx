import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const ChooseDay = ({ handleDateSelection }) => {
  const [selectedDate, setSelectedDate] = useState('');

  const handleClickSelection = (value) => {
    setSelectedDate(value);
    handleDateSelection(value);
  };

  return (
    <div>
      <Select value={selectedDate} onValueChange={handleClickSelection}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sortera efter"/>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={'tidigast'}>Tidigast datum</SelectItem>
          <SelectItem value={'senaste-datum'}>Senaste datum</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
