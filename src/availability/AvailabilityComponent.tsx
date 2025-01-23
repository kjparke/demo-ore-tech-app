import React from 'react';
import './Availability.css';


interface AvailabilityProps {
    equipmentType: string;
    availability: number;
}

export default function AvailabilityComponent(props: AvailabilityProps) {
  return (
    <div className="d-flex pa-container align-items-center justify-content-between">
      <p className="mb-0">
        {props.equipmentType}
      </p>
      <p className="physical-availability">
        {`${props.availability.toFixed(1)}%`}
      </p>
    </div>
  );
}
