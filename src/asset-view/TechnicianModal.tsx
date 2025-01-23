import { useState } from "react";
import { Asset } from "../interfaces/Asset";
import { parseAssetId } from "../helpers/AssetHelpers";

interface TechnicianModalProps {
  modalId: string;
  asset: Asset;
}

export default function TechnicianModal(props: TechnicianModalProps) {
  const [technicians, setTechnicians] = useState<string[]>([]);
  
  return (
    <div id={props.modalId} className="modal fade">
      <div className="modal-dialog modal-xl modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title fw-bold ps-3">{parseAssetId(props.asset.unitId)}</h4>
            <div className={`ms-5 secondary-status-chip status-${props.asset.status}`}>
              <p className="mb-0">{props.asset.activeEvent.secondaryStatus}</p>
            </div>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
          </div>
          <div className="modal-footer d-flex justify-content-between">
            <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}
