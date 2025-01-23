import { Event } from "./Event";
import { Technician } from "./Technician";

export interface Asset {
  _id: string;
  unitId: string;
  fms: string;
  modelCode: string;
  equipmentType: string;
  truckType: string;
  status: string;
  wencoStatus: string | null;
  minestarStatus: string | null;
  location: string | "";
  refreshedTime: string;
  operatingType: string;
  activeEvent: Event;
}

export interface ManualImport {
  unitId: string;
  status: string;
  secondaryStatus: string;
  location: string;
  bay: string;
  workOrderNumber: string;
  purchaseOrderNumber: string;
  downDate: string;
  scheduleOutDate: string;
  modelCode?: string;
}

export interface AssetDetail {
  unitId: string;
  eventId: string;
  status: string;
  secondaryStatus: string;
  workOrderNumber: string;
  purchaseOrderNumber: string;
  hoursInStatus: string;
  scheduleOutDate: string | null;
  revisedOutDate: string | null;
  downDate: string;
  location: string;
  bay: string;
  toBePlanned: boolean;
  toBeTowed: boolean;
  toBeScheduled: boolean;
  readyToBreakIn: boolean;
  washed: boolean;
  washComplete: boolean;
  releasedToOps: boolean;
  assignedTechnicians: Technician[];
  temp_assignedTechnicians: string[];
  initialStatus: string;
  initialSecondaryStatus: string;
}

export interface OperationalAsset {
  id: string;
  unitId: string;
  status: string;
}

export const defaultAssetPayload = {
  _id: "",
  unitId: "",
  fms: "",
  modelCode: "",
  equipmentType: "",
  truckType: "",
  status: "",
  wencoStatus: null,
  minestarStatus: null,
  location: "",
  refreshedTime: "",
  operatingType: "",
  activeEvent: {
    _id: "",
    unitId: "",
    status: "",
    hoursInStatus: "",
    workOrderNumber: "",
    purchaseOrderNumber: "",
    scheduleOutDate: "",
    scheduledInDate: "",
    secondaryStatus: "",
    location: "",
    bay: "",
    releasedToOps: false,
    lastUpdatedBy: "",
    updatedAt: "",
    conflict: false,
    purchaseOrderExpectedDate: "",
    isManuallyAdded: false,
    isStatusChangeManual: false,
    downDate: "",
    revisedOutDate: "",
    toBePlanned: false,
    washed: false,
    washComplete: false,
    toBeTowed: false,
    toBeScheduled: false,
    readyToBreakIn: false,
    assignedTechnicians: [],
    temp_assignedTechnicians: [],
    lastUpdated: "",
    actualOutDate: "",
  },
};

export const defaultAssetDetail = {
  unitId: "",
  eventId: "",
  status: "",
  secondaryStatus: "",
  workOrderNumber: "",
  purchaseOrderNumber: "",
  hoursInStatus: "",
  scheduleOutDate: null,
  revisedOutDate: null,
  downDate: "",
  location: "",
  bay: "",
  toBePlanned: false,
  toBeTowed: false,
  washed: false,
  toBeScheduled: false,
  readyToBreakIn: false,
  releasedToOps: false,
  washComplete: false,
  assignedTechnicians: [],
  temp_assignedTechnicians: [],
  initialStatus: "",
  initialSecondaryStatus: "",
};
