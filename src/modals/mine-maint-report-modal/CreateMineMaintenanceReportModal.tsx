import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import { MineMaintenanceReport } from "../../interfaces/MineMaintenanceReport";
import useFetchEvents from "./hooks/UseFetchEvents";
import useReportState from "./hooks/UseReportState";
import useGenerateReport from "./hooks/UseGenerateReport";
import WorkToBeCompletedTable from "./components/WorkToBeCompletedTable";
import EventDropdown from "./components/EventsDropdown";
import WorkCompletedTable from "./components/WorkCompletedTable";
import TextAreaInput from "../../elements/inputs/TextAreaInput";

interface CreateShiftCrossoverReportModalProps {
  report?: MineMaintenanceReport | null;
}

export default function CreateShiftCrossoverReportModal({
  report,
}: CreateShiftCrossoverReportModalProps) {
  const [selectedEventId, setSelectedEventId] = useState<string>("");
  const { user } = useAuth();

  const {
    workCompletedEvents,
    workToBeCompletedEvents,
    fetchWorkCompleted,
    fetchWorkPending,
    loading,
    error,
  } = useFetchEvents();

  const {
    mineMaintenanceReport,
    updateField,
    resetReport,
    updateNotes,
    addEvent,
    removeEvent,
  } = useReportState(report);

  const { createAndDownloadReport } = useGenerateReport();

  useEffect(() => {
    fetchWorkCompleted();
    fetchWorkPending();
  }, [fetchWorkCompleted, fetchWorkPending]);

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

  const handleGenerateReport = async () => {
    try {
      await createAndDownloadReport({
        ...mineMaintenanceReport,
        reportName: "Mine Maintenance Crossover Report",
        createdBy: user,
      });

      // fetchReports()
    } catch (error) {
      console.error("Failed to generate the report:", error);
    }
  };

  return (
    <div id="mine-maint-report-modal" className="modal fade" tabIndex={-1}>
      <div className="modal-dialog modal-xl modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">
              Create Mine Maintence Crossover Report
            </h4>
          </div>
          <div className="modal-body">
            {loading ? (
              <p>Loading events...</p>
            ) : error ? (
              <p className="text-danger">{error}</p>
            ) : (
              <>
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">Creator</label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      readOnly
                      className="form-control-plaintext"
                      value={`${user?.firstName} ${user?.lastName}`}
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
                      onChange={(e) => updateField("crew", e.target.value)}
                    />
                  </div>
                </div>

                <hr />
                <h5>Safety</h5>
                <TextAreaInput
                  id="safety"
                  value={mineMaintenanceReport.safety || ""}
                  onChange={updateField}
                />

                <h5 className="mt-2">Summary</h5>
                <TextAreaInput
                  id="summary"
                  value={mineMaintenanceReport.summary || ""}
                  onChange={updateField}
                />

                <h5 className="mt-2">Units Released</h5>
                <div className="row">
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
                </div>
                <WorkCompletedTable
                  events={mineMaintenanceReport.workCompleted}
                  onRemoveEvents={(id) => removeEvent("workCompleted", id)}
                />

                <h5 className="mt-2">In Progress Units</h5>
                <div className="row">
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
                </div>
                <WorkToBeCompletedTable
                  events={mineMaintenanceReport.workToBeCompleted}
                  isEditable
                  onRemoveEvents={(id) => removeEvent("workToBeCompleted", id)}
                  onUpdateNotes={updateNotes}
                />
              </>
            )}
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={resetReport}
            >
              Close
            </button>
            <button
              className="btn btn-primary"
              onClick={handleGenerateReport}
              data-bs-dismiss="modal"
            >
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
