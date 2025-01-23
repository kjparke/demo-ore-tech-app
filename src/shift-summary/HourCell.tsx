import { mapStatusToEnum } from "../helpers/ShiftSummaryHelpers";

interface HourCellProps {
  hour: number;
  status: string;
  showTimeRange: boolean;
}

export default function HourCell({ hour, status, showTimeRange }: HourCellProps) {
  return (
    <td
      key={hour}
      style={{
        padding: "1px",
        backgroundColor: "transparent",
      }}
    >
      <div
        className={`status-${mapStatusToEnum(status)} status-cell`}
        style={{
          borderRadius: "5px",
          height: "20px",
          width: "100%",
          textAlign: "center",
        }}
      >
      </div>
    </td>
  );
}