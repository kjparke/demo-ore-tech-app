export interface AvailabilityData {
  operational: number;
  total: number;
  percentage: number;
}

export interface AvailabilityResponse {
  haulTruck: AvailabilityData;
  dozer: AvailabilityData;
  graders: AvailabilityData;
  letourneau: AvailabilityData;
  shovels: AvailabilityData;
  drills: AvailabilityData;
  overall: AvailabilityData;
}