import { useState, useCallback } from "react";
import { EventReportPayload } from "../../../interfaces/Event";
import API from "../../../Api";

export default function useFetchEvents() {
  const [workCompletedEvents, setWorkCompletedEvents] = useState<EventReportPayload[]>([]);
  const [workToBeCompletedEvents, setWorkToBeCompletedEvents] = useState<EventReportPayload[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWorkCompleted = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await API.get("/report/work-completed");
      setWorkCompletedEvents(response.data);
    } catch (error) {
      console.error("Error fetching Work Completed events:", error);
      setError("Failed to fetch Work Completed events");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchWorkPending = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await API.get("/report/work-pending");
      setWorkToBeCompletedEvents(response.data);
    } catch (error) {
      console.error("Error fetching Work Pending events:", error);
      setError("Failed to fetch Work Pending events");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    workCompletedEvents,
    setWorkCompletedEvents,
    workToBeCompletedEvents,
    setWorkToBeCompletedEvents,
    fetchWorkCompleted,
    fetchWorkPending,
    loading,
    error,
  };
}