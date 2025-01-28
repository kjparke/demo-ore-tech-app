import { BAY_NUMBERS, LOCATIONS } from "../constants/GeneralConstants";

export const getBayOptions = (selectedLocation: string): string[] => {
  let bayNumbers;
  switch (selectedLocation) {
    case LOCATIONS.TRUCK_SHOP:
      bayNumbers = BAY_NUMBERS.TRUCK_SHOP_BAYS;
      break;
    case LOCATIONS.AUXILIARY_SHOP:
      bayNumbers = BAY_NUMBERS.AUX_SHOP_BAYS;
      break;
    case LOCATIONS.LAYDOWN_YARD:
      bayNumbers = BAY_NUMBERS.LAYDOWN_YARD_BAYS;
      break;
    case LOCATIONS.WELD:
      bayNumbers = BAY_NUMBERS.WELD_BAYS;
      break;
    case LOCATIONS.APRONS:
      bayNumbers = BAY_NUMBERS.APRON_BAYS;
      break;
    case LOCATIONS.OFF_SITE:
      bayNumbers = BAY_NUMBERS.OFF_SITE;
      break;
    default:
      return [];
  }

  return bayNumbers.map((bayNumber) => `Bay ${bayNumber}`).sort();
};
