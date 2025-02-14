export const dummyEvent1 = {
  _id: "dummy-event-1",
  unitId: "2001",
  status: "down_waiting",
  toBePlanned: false,
  toBeTowed: false,
  toBeScheduled: false,
  readyToBreakIn: false,
  washed: false,
  releasedToOps: false,
  isManuallyAdded: false,
  isStatusChangeManual: false,
  location: "Recent Downs",
  bay: "",
  temp_assignedTechnicians: [],
  conflict: false,
  hoursInStatus: "3 hours",
  secondaryStatus: "Inspection",
  downDate: "2025-01-01T00:00:00.000Z",
  createdAt: "2025-01-01T00:00:00.000Z",
  updatedAt: "2025-01-01T00:00:00.000Z",
  workOrderNumber: "WO-123",
  assignedTechnicians: [],
};

export const dummyEvent2 = {
  _id: "dummy-event-2",
  unitId: "2002",
  status: "down_scheduled",
  toBePlanned: true,
  toBeTowed: false,
  toBeScheduled: false,
  readyToBreakIn: false,
  washed: true,
  releasedToOps: false,
  isManuallyAdded: false,
  isStatusChangeManual: true,
  location: "Weld Shop",
  bay: "Bay 3",
  temp_assignedTechnicians: [],
  conflict: false,
  hoursInStatus: "8 hours",
  secondaryStatus: "Routine Maintenance",
  downDate: "2025-01-02T08:00:00.000Z",
  createdAt: "2025-01-02T08:30:00.000Z",
  updatedAt: "2025-01-02T08:45:00.000Z",
  workOrderNumber: "WO-456",
  assignedTechnicians: [],
};
