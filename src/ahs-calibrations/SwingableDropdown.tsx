import React from 'react';
import { CalibrationTableRecords } from "../interfaces/AHSCalibrationRecord";
import { useAuth } from '../auth/AuthContext';
import API from '../Api';

interface SwingableDropdownProps {
  record?: CalibrationTableRecords;
	onUpdateSwingable: (newSwingable: string, unitId: string) => void;
}

export default function SwingableDropdown(props: SwingableDropdownProps) {
	const {user} = useAuth();

  const handleSwingableChange = async (newSwingable: string) => {
		const payload = {
			data: {
				unitId: props.record?.unitId,
				swingable: newSwingable
			}, 
			metaData: {
				user
			}
		}
		try {
			const response = await API.patch("/ahsCalibrations/ahs-asset", payload)
			props.onUpdateSwingable(response.data.swingable, props.record?.unitId ?? "No");
		} catch (error) {
			console.log(error)
		}
  };

  return (
    props.record?.record ? (
      <strong>CALS</strong>
    ) : (
      <select value={props.record?.swingable} onChange={(e) => handleSwingableChange(e.target.value)} className="form-control">
        <option value="No">No</option>
        <option value="Yes">Yes</option>
      </select>
    )
  );
}
