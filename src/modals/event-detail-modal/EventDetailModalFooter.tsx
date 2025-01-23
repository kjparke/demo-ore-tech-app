import { useAuth } from "../../auth/AuthContext";
import { Asset } from "../../interfaces/Asset";
import { Payload } from "../../interfaces/Payload";
import assetServiceInstance from "../../services/asset.service";
import eventServiceInstance from "../../services/event.service";
import { useModalDispatch } from "../ModalStateContext";
import { useEventDetailModalContext } from "./EventDetailContext";

interface EventDetailModalFooterProps {
  initialAsset: Asset;
	onClose: () => void;
}

export default function EventDetailModalFooter({
  initialAsset,
	onClose: fetchData
}: EventDetailModalFooterProps) {
  const { asset, setAsset } = useEventDetailModalContext();
	const { user } = useAuth();
  const dispatch = useModalDispatch();

	const hasChanged = JSON.stringify(asset) !== JSON.stringify(initialAsset);

  const handleSave = async () => {
    try {
      const payload: Payload = {
        data: asset,
        metaData: user,
      };
      if(hasChanged) {
				await eventServiceInstance.updateEvent(payload);
      	fetchData();
			}
      dispatch({ type: "CLOSE_MODAL" });
    } catch (error) {
      console.error("Error updating asset:", error);
    }
  };
  const handleRelease = async () => {
		const confirmRelease = window.confirm(
      "Are you sure you want to release this asset? Ore-Tech will not track event changes for this asset until it is reporting as operational from Minestar/Wenco."
    );
    if (confirmRelease) {
      try {
        const payload: Payload = {
          data: asset,
          metaData: user,
        };
        await assetServiceInstance.releaseAsset(payload);
        fetchData();
        dispatch({ type: 'CLOSE_MODAL' });
      } catch (error) {
        console.error("Error encountered while releasing this asset: ", error);
      }
		}
  };
  const handleResetForm = () => {
    setAsset(initialAsset);
  };
  
  return (
    <div className="modal-footer d-flex justify-content-between">
      <button
        type="button"
        className="btn btn-inverse"
        onClick={() => dispatch({ type: "CLOSE_MODAL" })}
      >
        Close
      </button>
      <div>
        {hasChanged && (
          <button
            type="button"
            className="btn btn-inverse me-2"
            onClick={handleResetForm}
          >
            Discard Changes
          </button>
        )}
        <button
          type="button"
          className="btn btn-inverse me-2"
          onClick={handleRelease}
        >
          Release
        </button>
        <button type="button" className="btn btn-primary" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
}
