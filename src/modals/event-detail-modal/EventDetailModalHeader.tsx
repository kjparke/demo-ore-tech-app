import { formatStatusString } from "../../helpers/AssetHelpers";
import { useModalDispatch } from "../ModalStateContext";
import { useEventDetailModalContext } from "./EventDetailContext";


export default function EventDetailModalHeader() {
	const { asset } = useEventDetailModalContext();
  const dispatch = useModalDispatch();

  return (
    <div className="modal-header mb-3">
      <h4 className="modal-title fw-bold ps-3">{asset.unitId}</h4>
      <div
        className={`ms-5 secondary-status-chip status-${asset.activeEvent.status.replace(
          "_",
          "-"
        )}`}
      >
        <p className="mb-0">
          {formatStatusString(asset.activeEvent.status) +
            " - " +
            asset.activeEvent.secondaryStatus}
        </p>
      </div>
      <button
        type="button"
        className="btn-close"
        aria-label="Close"
        onClick={() => dispatch({ type: "CLOSE_MODAL" })}
      ></button>
    </div>
  );
}
