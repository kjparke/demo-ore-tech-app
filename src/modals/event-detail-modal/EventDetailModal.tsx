import { useEffect, useState } from "react";
import { MODAL_ID } from "../../constants/GeneralConstants";
import { Asset, defaultAssetPayload } from "../../interfaces/Asset";
import Modal from "../Modal";
import { useModalState } from "../ModalStateContext";
import EventDetailModalFooter from "./EventDetailModalFooter";
import EventDetailModalHeader from "./EventDetailModalHeader";
import EventDetailModalBody from "./EventDetailModalBody";
import { EventDetailModalProvider } from "./EventDetailContext";

interface EventDetailModalProps {
	onClose: () => void;
}

export default function EventDetailModal({ onClose }: EventDetailModalProps) {
  const [initialAssetState, setInitialAssetState] =
    useState<Asset>(defaultAssetPayload);
  const { selectedAsset } = useModalState();

  useEffect(() => {
    if (selectedAsset) setInitialAssetState(selectedAsset);
  }, [selectedAsset]);

  if (!selectedAsset ) return null;

  return (
    <EventDetailModalProvider selectedAsset={selectedAsset}>
      <Modal size="xxl" modalId={MODAL_ID.EVENT_MODAL}>
        <div className="mb-3">
          <EventDetailModalHeader />
          <EventDetailModalBody />
          <EventDetailModalFooter initialAsset={initialAssetState} onClose={onClose}/>
        </div>
      </Modal>
    </EventDetailModalProvider>
  );
}
