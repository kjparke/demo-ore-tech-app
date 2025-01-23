import { useState } from "react";
import CreateMineMaintenanceReport from "../modals/mine-maint-report-modal/CreateMineMaintenanceReportModal";
import GenerateReportButton from "./components/GenerateReportButton";
import { ReportHistoryTable } from "./components/ReportHistoryTable";
import { MineMaintenanceReport } from "../interfaces/MineMaintenanceReport";
import ViewMineMaintenanceReport from "../modals/mine-maint-report-modal/ViewMineMaintenanceReport";

export default function ReportsView() {
  const [selectedReport, setSelectedReport] = useState<MineMaintenanceReport | null>(null);

  const handleRowClick = (report: MineMaintenanceReport) => {
    setSelectedReport(report); 
  };

  return (
    <div>
      <div className="card mb-3 px-4 pt-2">
        <p className="subtitle text-start mb-1">Generate Report</p>
        <div className="row">
          <div className="col-2">
            <GenerateReportButton
              title="Mine Maintenance Crossover Report"
              modalId="mine-maint-report-modal"
            />
          </div>
        </div>
        {/* Pass row click handler */}
        <ReportHistoryTable onRowClick={handleRowClick} />
      </div>
      <button
        type="button"
        className="d-none" 
        id="modalTriggerButton"
        data-bs-toggle="modal"
        data-bs-target="#view-mine-maintenance-modal"
      ></button>

      {/* Modal */}
      <CreateMineMaintenanceReport />
			<ViewMineMaintenanceReport report={selectedReport} />
    </div>
  );
}