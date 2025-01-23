import { timeToHour } from "../helpers/ShiftSummaryHelpers";
import { EventDelta } from "./EventChartInterfaces";
import HourCell from "./HourCell";

interface RenderHourCellsProps {
  eventDelta: EventDelta;
  hour: number;
}

export default function RenderHourCells({
  eventDelta,
  hour,
}: RenderHourCellsProps) {
  const startHour = timeToHour(eventDelta.startTime);
  const endHour = timeToHour(eventDelta.endTime);

  // Check if the delta is within the same hour and should be rendered as a single hour block
  if (startHour === endHour && startHour === hour) {
    return <HourCell hour={hour} status={eventDelta.status} showTimeRange={true} />;
  }

  // Check if the delta spans across multiple hours or ends exactly at the current hour
  if (startHour <= hour && (endHour > hour || (endHour === hour && hour === 23))) {
    return <HourCell hour={hour} status={eventDelta.status} showTimeRange={false} />;
  }

  return <td key={hour} style={{ padding: "2px", backgroundColor: "transparent" }} />;
}
