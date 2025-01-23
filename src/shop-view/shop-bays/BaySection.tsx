import React, { useContext, useEffect, useState } from "react";
import StatusChip from "../StatusChip";
import { Asset } from "../../interfaces/Asset";
import BayOverCapacityAlert from "./BayOverCapacityAlert";
import EmptyBay from "../EmptyBay";
import { BAY_GROUPS } from "../../constants/GeneralConstants";
import { AssetContext } from "../../context/AssetContext";
import { ModalStateProvider } from "../../modals/ModalStateContext";
import EventDetailModal from "../../modals/event-detail-modal/EventDetailModal";


interface BaySectionProps {
  id: number;
  group: BAY_GROUPS;
}

export default function BaySection(props: BaySectionProps) {
  const [assetsInBay, setAssetsInBay] = useState<Array<Asset>>([]);
  const { downAssets, fetchDownAssets } = useContext(AssetContext);

  useEffect(() => {
    const assets = downAssets.filter((asset: Asset) => 
      asset.activeEvent.bay === `Bay ${props.id}` 
      && (asset.activeEvent.location === (props.group + ' Shop') || asset.activeEvent.location === props.group));
    if (assets) setAssetsInBay(assets);
  }, [downAssets, props.id, props.group]);

  return(
    <div className="mb-3">
      <p className="subtitle">Bay {props.id.toString()}</p>
      {assetsInBay.length > 1 &&
        <BayOverCapacityAlert />
      }
      {assetsInBay.map((asset: Asset) =>
        <ModalStateProvider key={asset.unitId} >
          <div className="mb-2">
          <StatusChip 
            asset={asset}
          />
        </div>
        <EventDetailModal onClose={fetchDownAssets} />
        </ModalStateProvider>
      )}
      {assetsInBay.length === 0 &&
        <EmptyBay />
      }
    </div>
  );
}