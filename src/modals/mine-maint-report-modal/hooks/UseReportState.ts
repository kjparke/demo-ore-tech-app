import { useEffect, useState } from "react";
import { defaultMineMaintenanceReport, MineMaintenanceReport } from "../../../interfaces/MineMaintenanceReport";
import { EventReportPayload } from "../../../interfaces/Event";

export default function useReportState(initialReport?: MineMaintenanceReport | null) {
  const [mineMaintenanceReport, setMineMaintenanceReport] = useState<MineMaintenanceReport>(
    initialReport || { ...defaultMineMaintenanceReport, workCompleted: [], workToBeCompleted: [] }
  );

  useEffect(() => {
    if (initialReport) {
      setMineMaintenanceReport(initialReport);
    } else {
      setMineMaintenanceReport({
        ...defaultMineMaintenanceReport,
        workCompleted: [],
        workToBeCompleted: [],
      });
    }
    
  }, [initialReport]);

  const updateField = (key: string, value: string) => {
    setMineMaintenanceReport((prev) => ({ ...prev, [key]: value }));
  };

  const resetReport = () => {
    setMineMaintenanceReport({ ...defaultMineMaintenanceReport, workCompleted: [], workToBeCompleted: [] });
  };

  const updateNotes = (id: string, value: string) => {
    setMineMaintenanceReport((prev) => ({
      ...prev,
      workToBeCompleted: prev.workToBeCompleted.map((event) =>
        event._id === id ? { ...event, notes: value } : event
      ),
    }));
  };

  const addEvent = (type: "workCompleted" | "workToBeCompleted", event: EventReportPayload) => {
    setMineMaintenanceReport((prev) => ({
      ...prev,
      [type]: [...prev[type], event],
    }));
  };

  const removeEvent = (type: "workCompleted" | "workToBeCompleted", id: string) => {
    const updatedEvents = mineMaintenanceReport[type].filter((event) => event._id !== id);
    setMineMaintenanceReport((prev) => ({
      ...prev,
      [type]: updatedEvents, 
    }));
  };

  return {
    mineMaintenanceReport,
    setMineMaintenanceReport,
    updateField,
    resetReport,
    updateNotes,
    addEvent,
    removeEvent,
  };
}