import moment from "moment";
import ScheduleInput from "./ScheduleInput";
import SchedulePlainText from "./SchedulePlainText";
import { Asset } from "../../../interfaces/Asset";

interface ScheduleSectionProps {
  asset: Asset;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ScheduleSection({
  asset,
  onChange,
}: ScheduleSectionProps) {
  return (
    <div className="card mb-3">
      <SchedulePlainText
        label="Time in Current Status"
        value={asset.activeEvent.hoursInStatus}
      />
      <SchedulePlainText
        label="Date Down"
        value={moment(asset.activeEvent.downDate).format(
          "MMMM Do YYYY, h:mm:ss a"
        )}
      />
      <ScheduleInput
        label="Scheduled Out Date"
        id="scheduleOutDate"
        value={moment(asset.activeEvent.scheduleOutDate).format("YYYY-MM-DD")}
        min={moment().toISOString()}
        onChange={onChange}
      />
      {moment(asset.activeEvent.scheduleOutDate).isBefore(moment()) && (
        <ScheduleInput
          label="Revised Out Date"
          id="revisedOutDate"
          value={moment(asset.activeEvent.revisedOutDate).format("YYYY-MM-DD")}
          min={moment(asset.activeEvent.scheduleOutDate).format("YYYY-MM-DD")}
          onChange={(e) => {
            onChange(e);
            e.stopPropagation();
          }}
        />
      )}
      <ScheduleInput
        label="Scheduled In Date"
        id="scheduledInDate"
        value={asset.activeEvent.scheduledInDate 
          ? moment(asset.activeEvent.scheduledInDate).format("YYYY-MM-DD")
          : "" }
        onChange={onChange}
      />
    </div>
  );
}
