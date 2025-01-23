import { DOWN_STATUSES, OPERATIONAL_STATUSES } from "../constants/GeneralConstants";

export function mapStatusToEnum(status: string) {
  if (status) {
    const normalizedStatus = status.toUpperCase();

    if (normalizedStatus.includes("DOWN_UNSCHEDULED")) {
      return "down-unscheduled";
    } else if (normalizedStatus.includes("DOWN_SCHEDULED")) {
      return "down-scheduled";
    } else if (normalizedStatus.includes("DOWN_WAITING")) {
      return "down-waiting";
    } else if (normalizedStatus.includes("OPERATIONAL")) {
      if (normalizedStatus.includes("OoS")) {
        return OPERATIONAL_STATUSES.OPERATIONAL.toLowerCase();
      } else if (normalizedStatus.includes("MANUAL RELEASE")) {
        return OPERATIONAL_STATUSES.OPERATIONAL.toLowerCase();
      } else {
        return OPERATIONAL_STATUSES.OPERATIONAL.toLowerCase();
      }
    } else if (normalizedStatus === "NOH") {
      return OPERATIONAL_STATUSES.NOH.toLowerCase();
    } else if (normalizedStatus === "DELAY") {
      return OPERATIONAL_STATUSES.DELAY.toLowerCase();
    } else if (normalizedStatus === "STANDBY") {
      return OPERATIONAL_STATUSES.STANDBY.toLowerCase();
    } else {
      return "Unknown Status";
    }
  } else {
    return "Unknown Status";
  }
}

export function formatStatus(status: string, secondaryStatus: string): string {
  return `${
    Object.values(DOWN_STATUSES).includes(status as DOWN_STATUSES)
      ? `${formatDownStatuses(status)} - ${secondaryStatus}`
      : `${status} - ${secondaryStatus}`
  }`;
}

export function formatDownStatuses(status: string) {
  return status
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export const timeToHour = (time: string): number => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours + minutes / 60;
};
