import React, { useEffect, useState } from "react";
import API from "../../Api";
import { MineMaintenanceReport } from "../../interfaces/MineMaintenanceReport";

interface ReportHistoryTableProps {
  onRowClick: (report: MineMaintenanceReport) => void;
}

export const ReportHistoryTable = ({ onRowClick }: ReportHistoryTableProps) => {
  const [reports, setReports] = useState<Array<MineMaintenanceReport>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await API.get("/report/");
        setReports(response.data);
      } catch (error) {
        console.error("Failed to fetch reports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleRowClick = (report: MineMaintenanceReport) => {
    onRowClick(report);
    document.getElementById("modalTriggerButton")?.click(); 
  };

	const getCreator = (report: MineMaintenanceReport) => {
		return report.createdBy 
		? `${report.createdBy.firstName} ${report.createdBy.lastName}`
		: "User Info Unavailable"
	}

  return (
    <table className="table table-striped table-bordered table-hover mt-2">
      <thead className="table-dark">
        <tr>
          <th scope="col">Report Name</th>
          <th scope="col">Crew</th>
          <th scope="col">Created by</th>
          <th scope="col">Date Created</th>
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <tr>
            <td colSpan={4} className="text-center">Loading...</td>
          </tr>
        ) : reports.length > 0 ? (
          reports.map((report) => (
            <tr
              key={report._id}
              style={{ cursor: "pointer" }}
              onClick={() => handleRowClick(report)}
            >
              <td>{report.reportName}</td>
              <td>{report.crew}</td>
              <td>{getCreator(report)}</td>
              <td>{new Date(report.createdAt).toLocaleDateString()}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={4} className="text-center">No Reports</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};