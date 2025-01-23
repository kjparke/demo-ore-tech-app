export interface StatusCountList {
  delay: number;
  down_scheduled: number; 
  down_unscheduled: number;
  down_waiting: number;
  pending: number;
  noh: number;
  operational: number;
}

export const defaultStatusCountList = {
  delay: 0,
  down_scheduled: 0,
  down_unscheduled: 0,
  down_waiting: 0,
  pending: 0,
  noh: 0,
  operational: 0,
}