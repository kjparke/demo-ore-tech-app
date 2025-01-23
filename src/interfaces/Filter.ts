export interface AssetFilters {
  modelCode: string[];
  location: string[];
  secondaryStatus: string[];
  planning: string[];
  hasWorkOrderNumber: boolean;
  hasAssignedTechnicians: boolean;
}

export const defaultAssetFilters: AssetFilters = {
  modelCode: [],
  location: [],
  secondaryStatus: [],
  planning: [],
  hasWorkOrderNumber: false,
  hasAssignedTechnicians: false
}
