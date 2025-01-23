import { BAY_GROUPS, BAY_NUMBERS } from "../../constants/GeneralConstants";
import { createBaySections } from "./BaySectionGenerator";


export default function WeldBays() {
  const baySections = createBaySections(BAY_GROUPS.WELD, [...BAY_NUMBERS.WELD_BAYS])
  return(
    <div className="row justify-content-center pt-3">
      { baySections }
    </div>
  );
}
