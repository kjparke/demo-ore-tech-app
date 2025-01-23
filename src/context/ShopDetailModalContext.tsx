import React, {
  createContext,
  useState,
  useContext,
  useCallback,
} from "react";
import { Asset, AssetDetail, defaultAssetDetail } from "../interfaces/Asset";
import shiftServiceInstance from "../services/shift.service";
import { HourlyChange } from "../interfaces/Log";

interface ModalContextType {
  assetDetail: AssetDetail;
  setAssetDetail: React.Dispatch<React.SetStateAction<AssetDetail>>;
  shiftSummary: HourlyChange[];
  setShiftSummary: React.Dispatch<React.SetStateAction<HourlyChange[]>>;
  fetchShiftSummary: () => void;
  isModalOpen: boolean;
  setModalOpen: (isOpen: boolean) => void;
}

export const ModalContext = createContext<ModalContextType>({
  assetDetail: defaultAssetDetail,
  setAssetDetail: (value: React.SetStateAction<AssetDetail>) => {},
  shiftSummary: [],
  setShiftSummary: (value: React.SetStateAction<HourlyChange[]>) => [],
  fetchShiftSummary: async () => {},
  isModalOpen: false,
  setModalOpen: (isOpen: boolean) => {}
});

export const ModalProvider: React.FC<{
  children: React.ReactNode;
  asset: Asset;
}> = ({ children, asset }) => {
  const [assetDetail, setAssetDetail] = useState<AssetDetail>({
    unitId: asset.unitId,
    eventId: asset.activeEvent._id,
    status: asset.status,
    secondaryStatus: asset.activeEvent.secondaryStatus,
    workOrderNumber: asset.activeEvent.workOrderNumber,
    purchaseOrderNumber: asset.activeEvent.purchaseOrderNumber,
    hoursInStatus: asset.activeEvent.hoursInStatus,
    scheduleOutDate: asset.activeEvent.scheduleOutDate
      ? new Date(asset.activeEvent.scheduleOutDate).toISOString().split("T")[0]
      : null,
    revisedOutDate: asset.activeEvent.revisedOutDate
      ? new Date(asset.activeEvent.revisedOutDate).toISOString().split("T")[0]
      : null,
    downDate: asset.activeEvent.downDate,
    location: asset.activeEvent.location,
    bay: asset.activeEvent.bay,
    toBePlanned: asset.activeEvent.toBePlanned,
    toBeTowed: asset.activeEvent.toBeTowed,
    washed: asset.activeEvent.washed,
    toBeScheduled: asset.activeEvent.toBeScheduled, 
    readyToBreakIn: asset.activeEvent.readyToBreakIn,
    washComplete: asset.activeEvent.washComplete,
    releasedToOps: asset.activeEvent.releasedToOps,
    assignedTechnicians: asset.activeEvent.assignedTechnicians || [],
    temp_assignedTechnicians: asset.activeEvent.temp_assignedTechnicians || [],
    initialStatus: asset.activeEvent.status,
    initialSecondaryStatus: asset.activeEvent.secondaryStatus,
  });
  const [shiftSummary, setShiftSummary] = useState<HourlyChange[]>([]);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const fetchShiftSummary = useCallback(async () => {
    try {
      const response = await shiftServiceInstance.getShiftSummary(
        asset.activeEvent._id
      );
      setShiftSummary(response.data);
    } catch (error) {
      console.error("Failed to fetch shift summary:", error);
      return [];
    }
  }, [asset]);

  return (
    <ModalContext.Provider
      value={{
        assetDetail,
        setAssetDetail,
        shiftSummary,
        setShiftSummary,
        fetchShiftSummary,
        isModalOpen, 
        setModalOpen,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
