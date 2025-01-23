import { useState, useEffect, useCallback } from "react";
import { useAsset } from "../../context/AssetContext";
import { Asset } from "../../interfaces/Asset";
import { ModalStateProvider } from "../../modals/ModalStateContext";
import StatusChip from "../StatusChip";
import EventDetailModal from "../../modals/event-detail-modal/EventDetailModal";

export default function PendingSection() {
  const [locationAssignedAssets, setLocationAssignedAssets] = useState<
    Array<Asset>
  >([]);
  const [locationUnassignedAssets, setLocationUnassignedAssets] = useState<
    Array<Asset>
  >([]);
  const { downAssets, fetchDownAssets } = useAsset();

  const filterLocationAssignedAssets = useCallback(() => {
    if (downAssets) {
      setLocationAssignedAssets(
        downAssets.filter(
          (asset) => asset.status === "pending" && asset.location !== "Pending"
        )
      );
    }
  }, [downAssets]);

  const filterLocationUnassignedAssets = useCallback(() => {
    if (downAssets) {
      setLocationUnassignedAssets(
        downAssets.filter(
          (asset) => asset.status === "pending" && asset.location === "Pending"
        )
      );
    }
  }, [downAssets]);

  useEffect(() => {
    filterLocationAssignedAssets();
    filterLocationUnassignedAssets();
  }, [filterLocationAssignedAssets, filterLocationUnassignedAssets]);

  // Helper to display assets
  const displayAssets = (assets: Asset[]) => {
    const columns: Asset[][] = Array.from({ length: 8 }, () => []);
    assets.forEach((asset, index) => {
      columns[index % 8].push(asset);
    });

    return (
      <div className="asset-section">
        <div className="row section-container">
          {columns.map((colAssets, colIndex) => (
            <div className="col-2" key={colIndex}>
              {colAssets.map((asset) => (
                <ModalStateProvider key={asset.unitId}>
                  <div className="mb-2">
                    <StatusChip asset={asset} />
                    <EventDetailModal onClose={fetchDownAssets} />
                  </div>
                </ModalStateProvider>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="card pending-section">
      <>
        <div>
        <p className="subtitle text-start">Location Assigned</p>
        {locationAssignedAssets.length > 0 ? (
          displayAssets(
            locationAssignedAssets.sort((a, b) =>
              a.unitId.localeCompare(b.unitId, "en", { sensitivity: "base" })
            )
          )
        ) : (
          <p className="text-center">No Pending Assets</p>
        )}
        </div>
        <div>
        <p className="subtitle text-start">Location Pending</p>
        {locationUnassignedAssets.length > 0 ? (
          displayAssets(
            locationUnassignedAssets.sort((a, b) =>
              a.unitId.localeCompare(b.unitId, "en", { sensitivity: "base" })
            )
          )
        ) : (
          <p className="text-start fs-6">No pending assets</p>
        )}
        </div>
      </>
    </div>
  );
}
