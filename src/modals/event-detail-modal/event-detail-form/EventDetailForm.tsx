import React, { ChangeEvent } from "react";
import TrackingSection from "./TrackingSection";
import ScheduleSection from "./ScheduleSection";
import StatusSection from "./StatusSection";
import { useEventDetailModalContext } from "../EventDetailContext";
import AddTechnician from "./AddTechnician";
import CheckboxGroup from "./CheckboxGroup";

export default function EventDetailSection() {
	const {asset, setAsset} = useEventDetailModalContext();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setAsset((prevState) => ({
      ...prevState,
      activeEvent: {
        ...prevState.activeEvent,
        [id]: value,
      },
    }));
  };

	const handleStringInputChange = (id: string, value: string) => {
    setAsset((prevState) => ({
      ...prevState,
      activeEvent: {
        ...prevState.activeEvent,
        [id]: value,
      },
    }));
  };

	const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;
    setAsset((prevState) => ({
      ...prevState,
			activeEvent: {
        ...prevState.activeEvent,
      [id]: checked,
			}
    }));
  };

  return (
    <div className="event-detail">
      <TrackingSection asset={asset} onChange={handleInputChange} />
      <ScheduleSection asset={asset} onChange={handleInputChange} />
			<StatusSection asset={asset} onStatusChange={handleStringInputChange} onManualStatusChange={handleCheckboxChange}/>
			<CheckboxGroup onChange={handleCheckboxChange} />
			<AddTechnician />
			
    </div>
  );
}
