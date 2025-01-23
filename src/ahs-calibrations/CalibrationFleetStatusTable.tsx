import { CalibrationTableRecords, defaultAHSCalibrationRecord } from "../interfaces/AHSCalibrationRecord";
import CalibrationFleetStatusTableHeader from "./CalibrationFleetStatusTableHeader";
import SwingableDropdown from "./SwingableDropdown";
import AHSCalModal from "./AHSCalModal";

interface CalibrationFleetStatusTableProps {
  records: CalibrationTableRecords[];
  setRecords: React.Dispatch<React.SetStateAction<CalibrationTableRecords[]>>;
  fetchData: () => void;
}

export default function CalibrationFleetStatusTable(
  props: CalibrationFleetStatusTableProps
) {
  const sortedRecords = [...props.records].sort((a, b) => {
    if (a.unitId < b.unitId) return -1;
    if (a.unitId > b.unitId) return 1;
    return 0;
  });

  const handleUpdateSwingable = (newSwingable: string, unitId: string) => {
    const newRecords = props.records.map((record) => {
      if (record.unitId === unitId) {
        return {
          ...record,
          swingable: newSwingable 
        };
      }
      return record;
    });
  
    props.setRecords(newRecords);
  };

  const checkmark = (value: boolean = false) => {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "20px" }}>
        {value ? <i className="bi bi-check-square-fill"></i> : ""}
      </div>
    );
  };

  const newCalButton = (unitId: string) => {
    return (
      <button
        type="button"
        className="btn btn-inverse"
        data-bs-toggle="modal"
        data-bs-target={`#ahs-calibration-modal-${unitId}`}
      >
        <i className="bi bi-plus-square"></i> New
      </button>
    );
  };

  const openActiveCalButton = (unitId: string) => {
    return (
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target={`#ahs-calibration-modal-${unitId}`}
      >
        <i className="bi bi-pencil-square"></i> Open
      </button>
    );
  };

  const statusIcon = (status: string) => {
    let statusClass = "";

    const operationalStatuses = ["NOH", "STANDBY", "DELAY", "OPERATIONAL"];
    if (operationalStatuses.includes(status)) {
      statusClass = "status-operational";
    } else {
      statusClass = `status-${status.replace("_", "-")}`;
    }
    return (
      <div className="status-circle-container my-auto">
        <div className={`status-circle ${statusClass}`}></div>
      </div>
    );
  };

  return (
    <div>
      <table className="table table-striped table-bordered table-hover mt-2">
        <CalibrationFleetStatusTableHeader />
        <tbody>
          {sortedRecords.map((record) => {
            return (
              <tr key={record._id}>
                <td>
                  <div className="d-flex">
                    {statusIcon(record.status)}
                    {record.unitId}
                  </div>
                </td>
                <td>{record.location}</td>
                <td>
                  <SwingableDropdown record={record && record} onUpdateSwingable={handleUpdateSwingable}/>
                </td>
                <td>
                  {record.record
                    ? openActiveCalButton(record.unitId)
                    : newCalButton(record.unitId)}
                </td>
                <td>{checkmark(record && record.record?.radarLidarCheck)}</td>
                <td>{checkmark(record && record.record?.steeringSolenoid)}</td>
                <td>{checkmark(record && record.record?.brakeSolenoid)}</td>
                <td>{checkmark(record && record.record?.gams)}</td>
                <td>{checkmark(record && record.record?.positioningSurvey)}</td>
                <td>{checkmark(record && record.record?.perceptionCal)}</td>
                <td>
                  {checkmark(
                    record && record.record?.planningCheckoutStraightAhead
                  )}
                </td>
                <td>
                  {checkmark(record && record.record?.planningCheckoutSteering)}
                </td>
                <td>
                  {checkmark(record && record.record?.planningCheckoutBraking)}
                </td>
                <td>
                  {checkmark(record && record.record?.planningCheckoutInCycle)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {sortedRecords.map((record) => {
        return (
          <AHSCalModal 
            modalId={`ahs-calibration-modal-${record.unitId}`}
            record={record.record 
              ? record.record 
              : {
                ...defaultAHSCalibrationRecord, 
                unitId: record.unitId, 
                location: record.location, 
                minestarVersion: record.minestarVersion
              }
            }
            fetchData={props.fetchData}
          />
        );
      })}
    </div>
  );
}