import { DateFormat } from "../constants/GeneralConstants";
import { formatDate, truncateText } from "../helpers/AssetHelpers";
import { Asset } from "../interfaces/Asset";
import { Note } from "../interfaces/Note";

interface AssetTableRowProps {
  asset: Asset;
  latestNote: Note | null;
  onOpenEventDetailModal: (asset: Asset) => void;
}

export const AssetTableRow: React.FC<AssetTableRowProps> = ({
  asset,
  latestNote,
  onOpenEventDetailModal,
}) => {
  const handleOpenModal = () => {
    onOpenEventDetailModal(asset);
  };

  const renderCheckIcon = (condition: boolean) =>
    condition ? <i className="bi bi-check-square-fill"></i> : null;

  const formattedDate = asset.activeEvent?.scheduleOutDate
    ? formatDate(asset.activeEvent?.scheduleOutDate, DateFormat.YEAR_MONTH_DAY)
    : "";

  // Join the assignedTechnicians array with commas
  const assignedTechnicians = asset.activeEvent.assignedTechnicians.join(", ");

  return (
    <>
      {asset.activeEvent && (
        <tr key={asset._id}>
          <td>
            <span
              className="status-text"
              onClick={handleOpenModal}
              data-target="#shop-details-modal"
            >
              {asset.unitId}
            </span>
          </td>
          <td>{asset.modelCode}</td>
          <td>
            {asset.activeEvent.bay
              ? `${asset.activeEvent.location} - ${asset.activeEvent.bay}`
              : asset.activeEvent?.location}
          </td>
          <td>{asset.activeEvent?.secondaryStatus}</td>
          <td>{truncateText(asset.activeEvent ? asset.activeEvent.workOrderNumber : "", 20)}</td>
          <td>{formattedDate}</td>
          <td>{renderCheckIcon(asset.activeEvent?.toBePlanned)}</td>
          <td>{renderCheckIcon(asset.activeEvent?.toBeTowed)}</td>
          <td>{renderCheckIcon(asset.activeEvent?.washed)}</td>
          <td>{renderCheckIcon(asset.activeEvent?.toBeScheduled)}</td>
          <td>{renderCheckIcon(asset.activeEvent?.readyToBreakIn)}</td>
          <td>{assignedTechnicians}</td> 
          <td>
            <div className="d-flex justify-content-between h-100">
              <span className={latestNote ? "" : "no-notes"}>
                {latestNote
                  ? latestNote.text
                  : "Click the unit ID to add a note."}
              </span>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};