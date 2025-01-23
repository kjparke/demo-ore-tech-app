import React, {
  createContext,
  useState,
  useContext,
  useCallback,
} from "react";
import { Asset } from "../interfaces/Asset";
import API from "../Api";
import { AssetFilters, defaultAssetFilters } from "../interfaces/Filter";

interface AssetContextType {
  downAssets: Asset[];
  filterBy: AssetFilters;
  setFilterBy: React.Dispatch<React.SetStateAction<AssetFilters>>;
  fetchDownAssets: () => void
}

export const AssetContext = createContext<AssetContextType>({
  downAssets: [],
  filterBy: defaultAssetFilters, 
  setFilterBy: () => {}, 
  fetchDownAssets: () => {}
});

export const AssetProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [downAssets, setDownAssets] = useState<Asset[]>([]);
  const [filterBy, setFilterBy] = useState<AssetFilters>(defaultAssetFilters);

  const getQueryParams = useCallback(() => {
    const queryParams = new URLSearchParams();
    
    if (filterBy.location.length > 0) {
      queryParams.append("location", filterBy.location.join(","));
    }
    if (filterBy.modelCode.length > 0) {
      queryParams.append("modelCode", filterBy.modelCode.join(","));
    }
    if (filterBy.secondaryStatus.length > 0) {
      queryParams.append("secondaryStatus", filterBy.secondaryStatus.join(","));
    }
    if (filterBy.planning.length > 0) {
      queryParams.append("planning", filterBy.planning.join(","));
    }
    
    queryParams.append("hasWorkOrderNumber", String(filterBy.hasWorkOrderNumber));
    queryParams.append("hasAssignedTechnicians", String(filterBy.hasAssignedTechnicians));
    
    return queryParams;
  }, [filterBy]);

  const fetchDownAssets = useCallback(async () => {
    try {
      const queryParams = getQueryParams();
      const response = await API.get(`/shop-view?${queryParams.toString()}`);
      if (Array.isArray(response.data)){
        setDownAssets(response.data);
      } else {
        console.error("Error fetching down assets", response.data)
      }
      setDownAssets(response.data)
    } catch (error) {
      console.error("Error fetch down assets: ", error);
    }
  }, [getQueryParams, filterBy]);

  return (
    <AssetContext.Provider
      value={{
        downAssets,
        filterBy, 
        setFilterBy,
        fetchDownAssets,
      }}
    >
      {children}
    </AssetContext.Provider>
  );
};

export const useAsset = () => {
  const context = useContext(AssetContext);
  if (context === undefined) {
    throw new Error("useAsset must be used within a AssetProvider");
  }
  return context;
};