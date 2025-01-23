import { useEffect, useRef, useState } from "react";
// import EventTable from "./components/EventTable";
import {
  defaultMineMaintenanceReport,
  MineMaintenanceReport,
} from "../../interfaces/MineMaintenanceReport";
import useReportState from "./hooks/UseReportState";
import useFetchEvents from "./hooks/UseFetchEvents";
import useGenerateReport from "./hooks/UseGenerateReport";
import TextFieldSection from "./components/TextFieldSection";
import { useAuth } from "../../auth/AuthContext";
import EventDropdown from "./components/EventsDropdown";
import WorkToBeCompletedTable from "./components/WorkToBeCompletedTable";
import WorkCompletedTable from "./components/WorkCompletedTable";

interface ViewMineMaintenanceReportModalProps {
  report?: MineMaintenanceReport | null;
}

export default function ViewMineMaintenanceReport({
  report,
}: ViewMineMaintenanceReportModalProps) {
  const [isModified, setIsModified] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string>("");
  const initialReportRef = useRef<string>("");

  const {
    mineMaintenanceReport,
    setMineMaintenanceReport,
    updateField,
    resetReport,
    addEvent,
    removeEvent,
  } = useReportState(report);
  const {
    workCompletedEvents,
    workToBeCompletedEvents,
    fetchWorkCompleted,
    fetchWorkPending,
  } = useFetchEvents();
  const { downloadReport, updateReport, updateAndDownloadReport } = useGenerateReport();
  const { user } = useAuth();

  const handleDownload = async () => {
    const payload = {
      ...mineMaintenanceReport,
      reportName: mineMaintenanceReport.reportName,
    };
    await downloadReport(payload);
    resetReport();
  };

  const handleUpdate = async () => {
    const payload = {
      data: {
        ...mineMaintenanceReport,
      }
    };
    await updateReport(payload);
  };

  const handleUpdateAndDownload = async () => {
    const payload = {
      ...mineMaintenanceReport,
    };

    await updateAndDownloadReport(payload);
  };

  const handleAddEvent = (type: "workCompleted" | "workToBeCompleted") => {
    const selectedEvent =
      type === "workCompleted"
        ? workCompletedEvents.find((event) => event._id === selectedEventId)
        : workToBeCompletedEvents.find(
            (event) => event._id === selectedEventId
          );

    if (selectedEvent) {
      addEvent(type, selectedEvent);
      setSelectedEventId("");
    }
  };

  const getCreator = (report: MineMaintenanceReport) => {
    return report.createdBy
      ? `${report.createdBy.firstName} ${report.createdBy.lastName}`
      : "User Info Unavailable";
  };

  const isCreator = () => {
    return report?.createdBy?.email === user?.email || false;
  };

  // Save initial report as stringified JSON
  useEffect(() => {
    if (report) {
      initialReportRef.current = JSON.stringify(report);
      setMineMaintenanceReport(report);
    }
  }, [report, setMineMaintenanceReport]);

  useEffect(() => {
    const currentReportString = JSON.stringify(mineMaintenanceReport);
    setIsModified(currentReportString !== initialReportRef.current);
  }, [mineMaintenanceReport]);

  useEffect(() => {
    fetchWorkCompleted();
    fetchWorkPending();
  }, [fetchWorkCompleted, fetchWorkPending]);

  useEffect(() => {
    if (report) setMineMaintenanceReport(report);
  }, [setMineMaintenanceReport, report]);

  return (
    <div id="view-mine-maintenance-modal" className="modal fade" tabIndex={-1}>
      <div className="modal-dialog modal-xl modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Mine Maintence Crossover Report</h4>
          </div>
          <div className="modal-body">
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Creator</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  readOnly
                  className="form-control-plaintext"
                  value={getCreator(report || defaultMineMaintenanceReport)}
                />
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="crew" className="col-sm-2 col-form-label">
                Crew
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="crew"
                  value={mineMaintenanceReport.crew || ""}
                  onChange={(e) => {
                    isCreator() && updateField("crew", e.target.value);
                  }}
                />
              </div>
            </div>

            <hr />

            {/* Text Input Fields */}
            <TextFieldSection
              id="safety"
              label="Safety"
              value={mineMaintenanceReport.safety}
              onChange={(key, value) => {
                isCreator() && updateField(key, value);
              }}
            />

            <TextFieldSection
              id="summary"
              label="Summary"
              value={mineMaintenanceReport.summary}
              onChange={(key, value) => {
                isCreator() && updateField(key, value);
              }}
            />

            {/* Work Completed */}
            <h5>Released Units</h5>
            {isCreator() && (
              <div className="d-flex mb-2">
                <EventDropdown
                  events={workCompletedEvents}
                  selectedEventId={selectedEventId}
                  onSelectEvent={(eventId) => setSelectedEventId(eventId)}
                />
                <button
                  className="btn btn-primary mx-2"
                  onClick={() => handleAddEvent("workCompleted")}
                >
                  Add
                </button>
              </div>
            )}
            <WorkCompletedTable
              events={mineMaintenanceReport.workCompleted}
              isEditable={isCreator()}
            />

            {/* Work To Be Completed */}
            <h5>In Progress Units</h5>
            {isCreator() && (
              <div className="d-flex mb-2">
                <EventDropdown
                  events={workToBeCompletedEvents}
                  selectedEventId={selectedEventId}
                  onSelectEvent={(eventId) => setSelectedEventId(eventId)}
                />
                <button
                  className="btn btn-primary mx-2"
                  onClick={() => handleAddEvent("workToBeCompleted")}
                >
                  Add
                </button>
              </div>
            )}
            <WorkToBeCompletedTable
              events={mineMaintenanceReport.workToBeCompleted}
              onRemoveEvents={(id) => removeEvent("workToBeCompleted", id)}
              isEditable={isCreator()}
            />
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" data-bs-dismiss="modal">
              Close
            </button>
            {isModified ? (
              <>
                <button
                  className="btn btn-primary"
                  onClick={handleUpdate}
                  data-bs-dismiss="modal"
                >
                  Update
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleUpdateAndDownload}
                  data-bs-dismiss="modal"
                >
                  Update and Download
                </button>
              </>
            ) : (
              <button
                className="btn btn-primary"
                onClick={handleDownload}
                data-bs-dismiss="modal"
              >
                Download
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
