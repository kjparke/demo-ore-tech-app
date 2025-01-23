import { createBaySections } from "./BaySectionGenerator";
import { BAY_GROUPS, BAY_NUMBERS } from "../../constants/GeneralConstants";


export default function AuxShopBays() {
  const baySections = createBaySections(BAY_GROUPS.AUXILIARY, [...BAY_NUMBERS.AUX_SHOP_BAYS]);
  return(
    <div className="row justify-content-center pt-3">
      { baySections }
    </div>
  );
}
