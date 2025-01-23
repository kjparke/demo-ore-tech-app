import React, {
  SetStateAction,
  createContext,
  useState,
  useContext,
  useEffect,
} from "react";
import { Asset, defaultAssetPayload } from "../../interfaces/Asset";

interface EventDetailModalContextType {
  asset: Asset;
  setAsset: React.Dispatch<SetStateAction<Asset>>;
}

export const EventDetailModalContext = createContext<
  EventDetailModalContextType | undefined
>(undefined);

export const EventDetailModalProvider: React.FC<{
  children: React.ReactNode;
  selectedAsset: Asset
}> = ({ children, selectedAsset }) => {
  const [asset, setAsset] = useState<Asset>(defaultAssetPayload);

  useEffect(() => {
    if(selectedAsset) setAsset(selectedAsset);
  }, [selectedAsset]);

  return (
    <EventDetailModalContext.Provider
      value={{
        asset,
        setAsset,
      }}
    >
      {children}
    </EventDetailModalContext.Provider>
  );
};

export const useEventDetailModalContext = () => {
  const context = useContext(EventDetailModalContext);
  if (context === undefined) {
    throw new Error(
      "useEventDetailModalContext must be used within a EventDetailModalProvider"
    );
  }
  return context;
};
