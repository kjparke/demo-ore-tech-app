import { Asset } from "../interfaces/Asset";
import { useModalDispatch } from "../modals/ModalStateContext";
import plan from "../images/plan.png";
import tow from "../images/tow-truck.png";
import wash from "../images/wash.png";
import calendar from "../images/calendar.png";

interface StatusChipProps {
  asset: Asset;
}

export default function StatusChip(props: StatusChipProps) {
  const dispatch = useModalDispatch();

  const handleOpenModal = (asset: Asset) => {
    dispatch({ type: "OPEN_MODAL", payload: asset });
  };

  return (
    <div
      className="status-chip d-flex"
      onClick={() => handleOpenModal(props.asset)}
    >
      <div className="status-circle-container my-auto">
        <div
          className={`status-circle status-${props.asset.activeEvent.status.replace(
            "_",
            "-"
          )}`}
        ></div>
      </div>
      <div className="flex-grow-1">
        <div className="d-flex justify-content-between">
          <p className="fw-bold mb-0">{props.asset.unitId}</p>
          <p className="fw-light mb-0">
            {props.asset.activeEvent.hoursInStatus}
          </p>
        </div>
        <div className="d-flex justify-content-between">
          <p className="fw-light mb-0">
            {props.asset.activeEvent.secondaryStatus
              ? props.asset.activeEvent.secondaryStatus.split(" - ")[0]
              : "No secondary status"}
          </p>
          <div className="d-flex">
            {props.asset.activeEvent.readyToBreakIn && (
              <i className="bi bi-check2-circle shop-chip-icon " />
            )}
            {props.asset.activeEvent.washed && (
              <img
              src={wash}
              className="shop-chip-icon "
              alt="Water icon"
              title="To be washed"
            />
            )}
            {props.asset.activeEvent.toBePlanned && (
              <img
              src={calendar}
              className="shop-chip-icon"
              alt="Plan icon"
              title="To be planned"
            />
            )}
            {props.asset.activeEvent.toBePlanned && (
              <img
              src={plan}
              className="shop-chip-icon"
              alt="Calendar logo"
              title="To be planned"
            />
            )}
          </div>
        </div>
      </div>
      
    </div>
  );
}
