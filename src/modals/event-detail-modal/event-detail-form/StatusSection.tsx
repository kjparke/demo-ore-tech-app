import { ChangeEvent, useCallback, useEffect, useState } from "react";
import StatusChangeToggle from "./StatusChangeToggle";
import { DOWN_STATUSES, MAINTENANCE_STATUSES } from "../../../constants/GeneralConstants";
import { Asset } from "../../../interfaces/Asset";
import LocationSection from "./LocationSection";
import StatusDropdown from "./StatusDropDown";
import API from "../../../Api";
import { useAppContext } from "../../../context/AppContext";

interface StatusSectionProps {
	asset: Asset;
	onStatusChange: (field: string, value: string) => void;
  onManualStatusChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export default function StatusSection({ asset, onStatusChange, onManualStatusChange}: StatusSectionProps) {
  const { secondaryStatuses } = useAppContext();

  const primaryStatusOptions = [
    { value: DOWN_STATUSES.SCHEDULED, label: 'Down Scheduled' },
    { value: DOWN_STATUSES.UNSCHEDULED, label: 'Down Unscheduled' },
    { value: DOWN_STATUSES.WAITING, label: 'Down Waiting' },
    { value: DOWN_STATUSES.PENDING, label: 'Pending'}
  ];

  const secondaryStatusOptions = [
    { value: '', label: 'Select a status' },
    ...secondaryStatuses.map((status) => ({ value: status, label: status })),
  ];

  return (
    <div className="card mb-3">
      <StatusDropdown
        label="Status"
        id="status"
        value={asset.activeEvent.status}
        options={primaryStatusOptions}
        onChange={(e) => onStatusChange('status', e.target.value)}
      />
      <StatusDropdown
        label="Secondary Status"
        id="secondaryStatus"
        value={asset.activeEvent.secondaryStatus}
        options={secondaryStatusOptions}
        onChange={(e) => onStatusChange('secondaryStatus', e.target.value)}
      />

      { asset.activeEvent.isStatusChangeManual && asset.activeEvent.status !== "pending" &&
        <StatusChangeToggle statusToggleValue={asset.activeEvent.isStatusChangeManual} onManualStatusChange={onManualStatusChange}/>
      }
			<LocationSection />
    </div>
  );
}
