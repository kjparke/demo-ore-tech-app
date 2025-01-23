import { Technician } from "./Technician";

export interface Event {
  _id: string;
  unitId: string;
  status: string;
  hoursInStatus: string;
  workOrderNumber: string | "";
  purchaseOrderNumber: string;
  scheduleOutDate: string | null;
  scheduledInDate: string | null;
  secondaryStatus: string;
  location: string;
  bay: string;
  releasedToOps: boolean;
  lastUpdatedBy: string;
  updatedAt: string;
  conflict: boolean;
  purchaseOrderExpectedDate: string;
  isManuallyAdded: boolean;
  isStatusChangeManual: boolean;
  downDate: string;
  revisedOutDate: string | null;
  toBePlanned: boolean;
  washed: boolean;
  washComplete: boolean;
  toBeTowed: boolean;
  toBeScheduled: boolean;
  readyToBreakIn: boolean;
  assignedTechnicians: Technician[];
  temp_assignedTechnicians: string[];
  lastUpdated: string;
  actualOutDate: string;
}

export interface EventReportPayload {
  _id: string;
  unitId: string;
  status: string;
  toBePlanned: boolean;
  toBeTowed: boolean;
  toBeScheduled: boolean;
  readyToBreakIn: boolean;
  washed: boolean;
  releasedToOps: boolean;
  isManuallyAdded: boolean;
  isStatusChangeManual: boolean;
  assignedTechnicians: string[];
  location: string;
  bay: string;
  temp_assignedTechnicians: string[];
  conflict: boolean;
  hoursInStatus: string;
  secondaryStatus: string;
  downDate: string; 
	actualOutDate?: string;
	scheduleOutDate?: string;
  createdAt: string; 
  updatedAt: string; 
  workOrderNumber: string;
  notes: string; 
}

export const defaultEventReportPayload: EventReportPayload = {
  _id: "",
  unitId: "",
  status: "",
  toBePlanned: false,
  toBeTowed: false,
  toBeScheduled: false,
  readyToBreakIn: false,
  washed: false,
  releasedToOps: false,
  isManuallyAdded: false,
  isStatusChangeManual: false,
  assignedTechnicians: [],
  location: "",
  bay: "",
  temp_assignedTechnicians: [],
  conflict: false,
  hoursInStatus: "",
  secondaryStatus: "",
  downDate: "",
  actualOutDate: "",
  scheduleOutDate: "",
  createdAt: "",
  updatedAt: "",
  workOrderNumber: "",
  notes: "",
};