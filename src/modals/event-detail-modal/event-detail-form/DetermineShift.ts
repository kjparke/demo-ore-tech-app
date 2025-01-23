import { SetStateAction } from "react";
import moment from "moment";

export const determineShiftAndDate = (
  setCurrentShift: React.Dispatch<SetStateAction<string>>,
  setShiftDate: React.Dispatch<SetStateAction<string>>
) => {
  const now = moment(); 
  const shiftStart = moment().set({ hour: 6, minute: 30 }); 
  const shiftEnd = moment().set({ hour: 19, minute: 30 }); 

  if (now.isBetween(shiftStart, shiftEnd, null, '[)')) {
    // Day shift
    setCurrentShift("Day Shift");
    setShiftDate(now.format("YYYY-MM-DD"));
  } else {
    // Night shift
    setCurrentShift("Night Shift");

    if (now.isAfter(shiftEnd)) {
      setShiftDate(now.format("YYYY-MM-DD"));
    } else {
      const previousDay = now.subtract(1, 'day');
      setShiftDate(previousDay.format("YYYY-MM-DD"));
    }
  }
};