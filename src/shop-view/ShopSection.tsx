import { useState, useEffect, useCallback } from "react";
import StatusChip from "./StatusChip";
import { Asset } from "../interfaces/Asset";
import BayOverCapacityAlert from "./shop-bays/BayOverCapacityAlert";
import EmptyBay from "./EmptyBay";
import { useAsset } from "../context/AssetContext";
import { ModalStateProvider } from "../modals/ModalStateContext";
import EventDetailModal from "../modals/event-detail-modal/EventDetailModal";

interface ShopSectionProps {
  title: string;
  capacity?: number;
  hasTwoColumns?: boolean;
}

export default function ShopSection(props: ShopSectionProps) {
  const [showAll, setShowAll] = useState(false);
  const [assets, setAssets] = useState<Array<Asset>>([]);
  const { downAssets, fetchDownAssets } = useAsset();

  const filterDownAssets = useCallback(
    (currentLocation: string) => {
      if (downAssets) {
        setAssets(
          downAssets.filter((asset) => {
            if (
              asset.activeEvent.location === "" &&
              currentLocation === "Recent Downs"
            )
              return true;
            return asset.activeEvent.location === currentLocation;
          })
        );
      }
    },
    [downAssets]
  );

  useEffect(() => {
    filterDownAssets(props.title);
  }, [filterDownAssets, props.title]);

  const sortedAssets = assets
    ? [...assets].sort((a: Asset, b: Asset) =>
        a.unitId.localeCompare(b.unitId, "en", { sensitivity: "base" })
      )
    : [];
  const displayedAssets = showAll ? sortedAssets : sortedAssets?.slice(0, 6);
  const isOverCapacity: boolean =
    !!props.capacity && assets.length > props.capacity;

  const showAssets = (displayedAssets: Asset[]) => {
    if (props.hasTwoColumns && assets.length > 3) {
      const assetCol1: Asset[] = displayedAssets.slice(
        0,
        displayedAssets.length / 2
      );
      const assetCol2: Asset[] = displayedAssets
        .slice(displayedAssets.length / 2, displayedAssets.length)
        .sort();
      return (
        <div className="row">
          <div className="col-6">
            {assetCol1.map((asset: Asset) => (
              <ModalStateProvider key={asset.unitId}>
                <div key={asset.unitId} className="mb-2">
                  <StatusChip asset={asset} />
                </div>
                <EventDetailModal onClose={fetchDownAssets} />
              </ModalStateProvider>
            ))}
          </div>
          <div className="col-6">
            {assetCol2.map((asset: Asset) => (
              <div key={asset.unitId} className="mb-2">
                <ModalStateProvider key={asset.unitId}>
                  <StatusChip asset={asset} />
                  <EventDetailModal onClose={fetchDownAssets} />
                </ModalStateProvider>
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      return displayedAssets.map((asset) => (
        <ModalStateProvider key={asset.unitId}>
          <div className="mb-2">
            <StatusChip asset={asset} />
            <EventDetailModal onClose={fetchDownAssets} />
          </div>
        </ModalStateProvider>
      ));
    }
  };

  return (
    <div className="card shop-section">
      <p className="subtitle">{props.title}</p>
      {isOverCapacity && <BayOverCapacityAlert />}
      {displayedAssets && displayedAssets.length > 0 ? (
        showAssets(displayedAssets)
      ) : (
        <EmptyBay />
      )}
      <div className="row justify-content-center">
        <div className={`col-${props.hasTwoColumns ? "6" : "12"}`}>
          {assets && assets.length > 4 && !showAll && (
            <button
              className="btn btn-primary text-small w-100"
              onClick={() => setShowAll(true)}
            >
              Show All ({assets.length})
            </button>
          )}
          {showAll && (
            <button
              className="btn btn-secondary text-small w-100"
              onClick={() => setShowAll(false)}
            >
              Show Less
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
