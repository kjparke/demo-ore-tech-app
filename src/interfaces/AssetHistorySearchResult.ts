import { Technician } from "./Technician";

export interface AssetHistorySearchResult {
  _id: string;
  unitId: string;
  toBePlanned: boolean;
  toBeTowed: boolean;
  washed: boolean;
  releasedToOps: boolean;
  isManuallyAdded: boolean;
  isStatusChangeManual: boolean;
  assignedTechnicians: Technician[] | null;
  workOrderNumber: string;
  purchaseOrderNumber: string;
  location: string;
  bay: string;
  temp_assignedTechnicians: string[];
  conflict: false;
  hoursInStatus: string;
  secondaryStatus: string;
  downDate: string;
  scheduleOutDate: string;
  actualOutDate: string;
  equipmentType: string;
  modelCode: string;
  durationInHours: number;
}
