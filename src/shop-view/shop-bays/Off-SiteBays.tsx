import BaySection from "./BaySection";
import { BAY_GROUPS } from "../../constants/GeneralConstants";


export default function OffSiteBays() {
  return(
    <div className="row justify-content-center pt-3">
      <div className="col-md-2">
        <BaySection 
          id={1}
          group={BAY_GROUPS.OFF_SITE}
        />
        <BaySection 
          id={3}
          group={BAY_GROUPS.OFF_SITE}
        />
      </div>
      <div className="col-md-2">
        <BaySection 
          id={2}
          group={BAY_GROUPS.OFF_SITE}
        />
        <BaySection 
          id={4}
          group={BAY_GROUPS.OFF_SITE}
        />
      </div>
    </div>
  );
}
