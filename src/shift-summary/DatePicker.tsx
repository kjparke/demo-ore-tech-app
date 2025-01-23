import moment from "moment";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface DatePickerProps {
  date: string;
  setDate: Dispatch<SetStateAction<string>>;
  min?: string;
}

export default function DatePicker(props: DatePickerProps) {
  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    props.setDate(e.target.value);
  };

  return (
    <>
      <input
        type="date"
        className="form-control"
        id="shiftDate"
        value={props.date}
        max={moment().format("YYYY-MM-DD")}
        onChange={handleDateChange}
      />
    </>
  );
}
