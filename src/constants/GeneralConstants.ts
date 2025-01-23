export enum BAY_GROUPS {
  HIGHMONT = "Highmont",
  AUXILIARY = "Auxiliary",
  TRUCK = "Truck",
  WELD = "Weld",
  APRON = "Aprons",
  OFF_SITE = "Off-Site"
}

export const BAY_NUMBERS = {
  TRUCK_SHOP_BAYS: [11, 18, 21, 24, 10, 19, 22, 25, 9, 20, 23],
  AUX_SHOP_BAYS: [8, 4, 7, 3, 6, 2, 5],
  HIGHMONT_BAYS: [1, 2, 3, 4],
  WELD_BAYS: [16, 14, 15, 13],
  APRON_BAYS: [
    2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 18, 19, 20, 21, 22, 23, 24, 25,
  ],
  OFF_SITE: [1, 2, 3, 4]
} as const;

export const VALID_SHOP_BAYS = [
  "Truck Shop",
  "Auxiliary Shop",
  "Aprons",
  "Weld",
  "Highmont Shop",
  "Off-Site"
];

export enum LOCATIONS {
  RECENT_DOWNS = "Recent Downs",
  SHOP_AUX_DOWNLINE = "Shop - Auxiliary Downline",
  SHOP_PROD_DOWNLINE = "Shop - Production Downline",
  SHOP_READY_LINE = "Shop Ready Line",
  CAL_PAD = "Cal Pad",
  TIRE_SHOP = "Tire Shop",
  STEAM_BAY = "Steam Bay",
  DOWN_IN_FIELD = "Down In Field",
  TRUCK_SHOP = "Truck Shop",
  AUXILIARY_SHOP = "Auxiliary Shop",
  HIGHMONT_SHOP = "Highmont Shop",
  WELD = "Weld",
  APRONS = "Aprons",
  OFF_SITE = "Off-Site", 
  PENDING = "Pending"
}

export const MAINTENANCE_STATUSES = [
  "Electrical 24/12 Volt System",
  "Cab/House",
  "Tires",
  "Engine",
  "Air System & Air Starting",
  "Steering",
  "Hydraulic System",
  "Brakes",
  "Cooling System (eng.)",
  "Transmission",
  "Chassis/Frame",
  "Dump Body",
  "Lube System",
  "Communication Devices",
  "Diffs. and Final Drives",
  "Fire Suppression",
  "Cleaning (Steaming)",
  "AHS System Calibration",
  "Pre-PM",
  "Suspension",
  "Lights",
  "PM",
  "Torque Conv/PTO & Drivelines",
  "Air Conditioning",
  "Betterment",
  "Y-Unknown",
  "Z-Space",
  "Z-Mech. Personnel",
  "AHS Control and Comm Systems",
  "AHS Structural - Masts and Deck",
  "Spindles/Hubs",
  "Z-Tire Personnel",
  "Z-No Tools Or Equipment",
  "Alternator",
  "Fuel Tank And Supply",
  "Waiting For Maintenance",
  "Z-Parts",
  "Z-Weld. Personnel",
  "Accident Repair",
  "General Mechanical",
  "PM Minor Corrective Maintenance",
  "Major Maintenance Shutdown",
  "Z-Relocate Equip tTo Mtce. Area",
  "Post PM",
  "Z-Employee Meetings",
  "DEF System",
  "Electrical Propulsion Circuit",
  "Electrical Retarder",
  "Z-No Operator/Coodination",
  "Z-Elect. Personnel",
  "Wheel Motor",
  "Water System-Water Trucks",
  "Structure/Car Body",
  "Air System",
  "Blades / Edges"
].sort();

export enum DOWN_STATUSES {
  UNSCHEDULED = "down_unscheduled",
  SCHEDULED = "down_scheduled",
  WAITING = "down_waiting",
  PENDING = "pending",
}

export enum OPERATIONAL_STATUSES {
  OPERATIONAL = "OPERATIONAL", 
  OPERATIONAL_OoS = "OPERATIONAL_OoS",
  OPERATIONAL_MANUAL_RELEASE = "OPERATIONAL_MANUAL_RELEASE", 
  NOH = "NOH",
  DELAY = "DELAY",
  STANDBY = "STANDBY",
}

export const OPERATIONAL_STATUS_ARRAY = [
  OPERATIONAL_STATUSES.OPERATIONAL,
  OPERATIONAL_STATUSES.OPERATIONAL_OoS, 
  OPERATIONAL_STATUSES.OPERATIONAL_MANUAL_RELEASE, 
  OPERATIONAL_STATUSES.NOH, 
  OPERATIONAL_STATUSES.DELAY, 
  OPERATIONAL_STATUSES.STANDBY
]

export enum DateFormat {
  YEAR_MONTH_DAY = "YYYY-MM-DD",
  MONTH_DAY_YEAR_HOUR = "MMMM Do YYYY, h:mm:ss a",
}

export const MODEL_CODES = [
  "CAT793C",
  "CAT793D",
  "Cat793D CMD",
  "Cat793F CMD",
  "CAT793F",
  "BE49R",
  "FTRK",
  "CAT789TOW",
  "CAT789WAT",
  "CAT730EJECTOR",
  "CAT740EJECTOR",
  "CAT793TOW",
  "CAT793WAT",
  "CATD10N",
  "CATD10T",
  "CAT16G",
  "CAT24M",
  "P&H2800XPA",
  "P&H2800XPB",
  "BI495HR",
  "P&H2800XPC",
  "P&H4100XPC",
  "LET1850",
  "Other",
];
export const PLANNING_FILTERS = [
  "To be towed", 
  "To be planned",
  "To be washed",
  "To be scheduled",
  "Ready to break-in"
]

export const defaultQueryParams = new URLSearchParams({
  location: "",
  modelCode: "", 
  secondaryStatus: "", 
  planning: "", 
  hasWorkOrderNumber: "false", 
  hasAssignedTechnicians: "false", 
});

export enum MODAL_ID  {
  EVENT_MODAL = "event-detail-modal",
  NOTE_MODAL = "notes-modal",
  HISTORICAL_EVENT_MODAL = "historical-event-modal",
}