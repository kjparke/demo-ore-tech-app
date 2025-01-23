import { createBaySections } from "./BaySectionGenerator";
import { BAY_GROUPS, BAY_NUMBERS } from "../../constants/GeneralConstants";


export default function ApronBays() {
    const baySections = createBaySections(BAY_GROUPS.APRON, [...BAY_NUMBERS.APRON_BAYS]);
    return(
      <div className="row justify-content-center pt-3">
        { baySections }
      </div>
    );
}
