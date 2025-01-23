import { useEffect, useState, useCallback } from "react";
import CalibrationFleetStatusTable from "./CalibrationFleetStatusTable";
import { AHSCalibrationRecord, CalibrationTableRecords } from "../interfaces/AHSCalibrationRecord";
import API from "../Api";
import ActiveAHSCalibrationsView from "./ActiveAHSCalibrationsView";
import ArchivedAHSCalibrationsTable from "./ArchivedAHSCalibrationsTable";

export default function CalibrationFleetStatus() {
  const [calibrationRecords, setCalibrationRecords] = useState<CalibrationTableRecords[]>([]);
  const [activeCalibrationRecords, setActiveCalibrationRecords] = useState<AHSCalibrationRecord[]>([]);



  const fetchCalibrationRecords = useCallback(async () => {
    try {
      const response = await API.get("/ahsCalibrations/calibration-fleet-status");
      const records = response.data as CalibrationTableRecords[];
      setCalibrationRecords(records);

      const activeRecords = records.map((record: CalibrationTableRecords) => record.record).filter((record: AHSCalibrationRecord | undefined): record is AHSCalibrationRecord => record !== undefined);
      setActiveCalibrationRecords(activeRecords);
    } catch (error) {
      console.error("Error fetching calibration records:", error);
    }
  }, []);

  useEffect(() => {
    fetchCalibrationRecords(); 
  }, [fetchCalibrationRecords]);


  return (
    <>
      <ul className="nav nav-tabs" id="shop-detail-tabs" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link tab-link active`}
            id="calibration-fleet-status-tab"
            data-bs-toggle="tab"
            data-bs-target={"#calibration-fleet-status"}
            type="button"
            role="tab"
          >
            Calibration Fleet Status
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link tab-link`}
            id="active-calibrations-tab"
            data-bs-toggle="tab"
            data-bs-target={"#active-calibrations"}
            type="button"
            role="tab"
          >
            Active Calibrations
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link tab-link`}
            id="completed-calibrations-tab"
            data-bs-toggle="tab"
            data-bs-target={"#completed-calibrations"}
            type="button"
            role="tab"
          >
            Completed Calibrations
          </button>
        </li>
      </ul>

      <div className="tab-content" id="ahs-calibration-view-tabs">
        <div
          className={`tab-pane fade show active`}
          id={"calibration-fleet-status"}
          role="tabpanel"
        >
          <CalibrationFleetStatusTable
            records={calibrationRecords}
            setRecords={setCalibrationRecords}
            fetchData={fetchCalibrationRecords}
          />
        </div>
        <div
          className={`tab-pane fade`}
          id={"active-calibrations"}
          role="tabpanel"
        >
          <ActiveAHSCalibrationsView 
            records={activeCalibrationRecords}
            setRecords={setActiveCalibrationRecords}
          />
        </div>
        <div
          className={`tab-pane fade`}
          id={"completed-calibrations"}
          role="tabpanel"
        >
          <ArchivedAHSCalibrationsTable />
        </div>
      </div>
    </>
  );
}
