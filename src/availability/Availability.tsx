import "./Availability.css";
import AvailabilityComponent from "./AvailabilityComponent";
import { useAppContext } from "../context/AppContext";

export default function Availability() {
  const {availabilityData} = useAppContext();

  if (!availabilityData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="card mb-3 px-4 pt-2">
        <p className="subtitle text-start mb-1">Physical Availability</p>
        <div className="row">
          <div className="col-2">
            <AvailabilityComponent equipmentType="Haul Trucks" availability={availabilityData.haulTruck.percentage} />
          </div>
          <div className="col-2">
            <AvailabilityComponent equipmentType="Dozers" availability={availabilityData.dozer.percentage} />
          </div>
          <div className="col-2">
            <AvailabilityComponent equipmentType="Graders" availability={availabilityData.graders.percentage} />
          </div>
          <div className="col-2">
            <AvailabilityComponent equipmentType="Letourneau" availability={availabilityData.letourneau.percentage} />
          </div>
          <div className="col-2">
            <AvailabilityComponent equipmentType="Shovels" availability={availabilityData.shovels.percentage} />
          </div>
          <div className="col-2">
            <AvailabilityComponent equipmentType="Drills" availability={availabilityData.drills.percentage} />
          </div>
        </div>
      </div>
    </div>
  );
}
