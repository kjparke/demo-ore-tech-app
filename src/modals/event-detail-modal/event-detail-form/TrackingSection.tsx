import { Asset } from "../../../interfaces/Asset";
import TrackingNumber from "./TrackingNumber";

interface TrackingSectionProps {
  asset: Asset;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TrackingSection({ asset, onChange }: TrackingSectionProps) {
  return (
    <div className="card mb-3">
      <div className="d-flex">
		
			<TrackingNumber
        label="Work Order Number"
        id="workOrderNumber"
        value={asset.activeEvent.workOrderNumber}
        onChange={onChange}
      />
			<TrackingNumber
        label="Purchase Order Number"
        id="purchaseOrderNumber"
        value={asset.activeEvent.purchaseOrderNumber}
        onChange={onChange}
      />
			</div>
    </div>
  );
}
