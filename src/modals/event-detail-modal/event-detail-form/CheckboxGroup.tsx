import React from "react";
import Checkbox from "./Checkbox";
import { useEventDetailModalContext } from "../EventDetailContext";

interface CheckboxGroupProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CheckboxGroup({ onChange }: CheckboxGroupProps) {
  const { asset } = useEventDetailModalContext();
  return (
    <div className="card mb-3">
      <div className="row mb-2">
        <div className="row">
          <Checkbox
            label="To Be Towed"
            id="toBeTowed"
            checked={asset.activeEvent.toBeTowed}
            onChange={onChange}
          />
          <Checkbox
            label="To Be Washed"
            id="washed"
            checked={asset.activeEvent.washed}
            onChange={onChange}
          />
          <Checkbox
            label="To Be Planned"
            id="toBePlanned"
            checked={asset.activeEvent.toBePlanned}
            onChange={onChange}
          />
        </div>
        <div className="row">
          <Checkbox
            label="To Be Scheduled"
            id="toBeScheduled"
            checked={asset.activeEvent.toBeScheduled}
            onChange={onChange}
          />
          <Checkbox
            label="Ready To Break-In"
            id="readyToBreakIn"
            checked={asset.activeEvent.readyToBreakIn}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
}
