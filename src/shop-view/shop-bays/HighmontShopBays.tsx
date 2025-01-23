import React from "react";
import BaySection from "./BaySection";
import { BAY_GROUPS } from "../../constants/GeneralConstants";


export default function HighmontShopBays() {
  return(
    <div className="row justify-content-center pt-3">
      <div className="col-md-2">
        <BaySection 
          id={1}
          group={BAY_GROUPS.HIGHMONT}
        />
        <BaySection 
          id={3}
          group={BAY_GROUPS.HIGHMONT}
        />
      </div>
      <div className="col-md-2">
        <BaySection 
          id={2}
          group={BAY_GROUPS.HIGHMONT}
        />
        <BaySection 
          id={4}
          group={BAY_GROUPS.HIGHMONT}
        />
      </div>
    </div>
  );
}
