import moment from "moment";
import { DateFormat } from "../constants/GeneralConstants";

export const parseAssetId = (id: string) => {
  const firstTwoCharacters: string = id.slice(0, 2);
  const lastTwoCharacters: string = id.slice(2);

  return `${firstTwoCharacters}-${lastTwoCharacters}`;
};

export const formatStatus = (status: string) => status.replace("_", " ");
export const formatDate = (date: string, format: DateFormat) =>
  moment(date).format(format);
export const truncateText = (text: string, maxLength: number) => {
  if (!text) return;
  if (text.length > maxLength) {
    return text.substring(0, maxLength - 3) + "...";
  } else {
    return text;
  }
};
export const formatStatusString = (inputString: string) => {
  return inputString
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};
