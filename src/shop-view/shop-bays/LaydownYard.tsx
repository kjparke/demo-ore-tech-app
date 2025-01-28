import React from "react";
import BaySection from "./BaySection";
import { BAY_GROUPS } from "../../constants/GeneralConstants";


export default function LaydownYardBays() {
  return(
    <div className="row justify-content-center pt-3">
      <div className="col-md-2">
        <BaySection 
          id={1}
          group={BAY_GROUPS.LAYDOWN_YARD}
        />
        <BaySection 
          id={3}
          group={BAY_GROUPS.LAYDOWN_YARD}
        />
      </div>
      <div className="col-md-2">
        <BaySection 
          id={2}
          group={BAY_GROUPS.LAYDOWN_YARD}
        />
        <BaySection 
          id={4}
          group={BAY_GROUPS.LAYDOWN_YARD}
        />
      </div>
    </div>
  );
}
