import { User } from "./User";

export interface AHSCalibrationRecord {
  _id: string;
  unitId: string;
  location: string;
  swingable: string;
  notes: string;
  radarLidarCheck: boolean;
  steeringSolenoid: boolean;
  brakeSolenoid: boolean;
  gams: boolean;
  positioningSurvey: boolean;
  perceptionCal: boolean;
  planningCheckoutStraightAhead: boolean;
  planningCheckoutSteering: boolean;
  planningCheckoutBraking: boolean;
  planningCheckoutInCycle: boolean;
  minestarVersion: string;
  shopReleaseDate: string;
  dateOfCals: string;
  isArchived: boolean;
  createdBy: User;
  completedBy: User;
  lastUpdatedBy: User;
  updatedAt: string;
  createdAt: string;
  completedAt: string;
}

export interface CalibrationTableRecords {
  _id: string, 
  unitId: string, 
  status: string, 
  swingable: string, 
  location: string,
  minestarVersion: string, 
  record?: AHSCalibrationRecord
}

export const defaultAHSCalibrationRecord = {
  _id: "",
  unitId: "",
  location: "",
  swingable: "No",
  notes: "",
  radarLidarCheck: false,
  steeringSolenoid: false,
  brakeSolenoid: false,
  gams: false,
  positioningSurvey: false,
  perceptionCal: false,
  planningCheckoutStraightAhead: false,
  planningCheckoutSteering: false,
  planningCheckoutBraking: false,
  planningCheckoutInCycle: false,
  minestarVersion: "",
  shopReleaseDate: "",
  dateOfCals: "",
  isArchived: false,
  createdBy: {
    firstName: "",
    lastName: "",
    email: "",
    accessLevel: 1,
    lastLoggedIn: "",
    hasTemporaryPassword: false,
    isActive: true,
  },
  lastUpdatedBy: {
    firstName: "",
    lastName: "",
    email: "",
    accessLevel: 1,
    lastLoggedIn: "",
    hasTemporaryPassword: false,
    isActive: true,
  },
  completedBy: {
    firstName: "",
    lastName: "",
    email: "",
    accessLevel: 1,
    lastLoggedIn: "",
    hasTemporaryPassword: false,
    isActive: true,
  },
  updatedAt: "", 
  createdAt: "",
  completedAt: "",
};
