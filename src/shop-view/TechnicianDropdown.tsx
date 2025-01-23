import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { Technician } from '../interfaces/Technician';
import technicianServiceInstance from '../services/technician.service';

interface TechnicianDropdownProps {
  selectedTechnicians: Technician[];
  onTechniciansChange: (selectedTechnicians: Technician[]) => void;
}

const TechnicianDropdown = (props: TechnicianDropdownProps) => {
  const [options, setOptions] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
		const fetchTechnicians = async () => {
			try {
				const response = await technicianServiceInstance.readTechnicians();
	
				if (Array.isArray(response.data)) {
					const allTechnicianOptions = response.data.map((tech: Technician) => ({
						value: tech._id,
						label: `${tech.firstName} ${tech.lastName}`,
					}));
	
					const filteredOptions = allTechnicianOptions.filter(
						(option: { value: string; label: string }) =>
							!props.selectedTechnicians.some((selectedTech) => selectedTech._id === option.value)
					);
					
					setOptions(filteredOptions);
				} else {
					console.error("Received data is not an array:", response.data);
					setOptions([]);
				}
			} catch (error) {
				console.error("Error fetching technicians:", error);
			}
		};
		fetchTechnicians();
	}, [props.selectedTechnicians]);
	

  return (
    <div className="row mb-2">
      <label htmlFor="assignedTechnician" className="col-sm-4 col-form-label col-form-label-sm">
        Assigned Technicians
      </label>
      <div className="col">
        <Select
          options={options}
          isMulti
          className="basic-multi-select"
          classNamePrefix="select"
          value={props.selectedTechnicians.map((t) => ({ value: t._id, label: `${t.firstName} ${t.lastName}` }))}
          onChange={(selectedOptions) => {
            const selectedTechnicians = selectedOptions.map((option) => ({...option,
              _id: option.value,
							title: '',
              firstName: option.label.split(' ')[0],
              lastName: option.label.split(' ')[1],
            }));
            props.onTechniciansChange(selectedTechnicians);
          }}
        />
      </div>
    </div>
  );
};

export default TechnicianDropdown;
