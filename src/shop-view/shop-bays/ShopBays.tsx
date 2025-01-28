import React from "react";
import ShopBayTabs from "./ShopBayTabs";
import TruckShopBays from "./TruckShopBays";
import AuxShopBays from "./AuxShopBays";
import LaydownYardBays from "./LaydownYard";
import WeldBays from "./WeldBays";
import ApronBays from "./ApronBays";
import OffSiteBays from "./Off-SiteBays";
import PendingSection from "./PendingSection";


export default function ShopBays() {
  return(
    <div className="pt-3 pb-5 shop-bays">
      <div className="card">
        <ShopBayTabs />
        <div className="tab-content" id="shop-view-content">
          <div className="tab-pane fade show active" id="truck-shop" role="tabpanel">
            <TruckShopBays />
          </div>
          <div className="tab-pane fade" id="aux-shop" role="tabpanel">
            <AuxShopBays />
          </div>
          <div className="tab-pane fade" id="aprons" role="tabpanel" >
            <ApronBays />
          </div>
          <div className="tab-pane fade" id="weld" role="tabpanel" >
            <WeldBays />
          </div>
          <div className="tab-pane fade" id="laydown-yard" role="tabpanel" >
            <LaydownYardBays />
          </div>
          <div className="tab-pane fade" id="off-site" role="tabpanel" >
            <OffSiteBays />
          </div>
          <div className="tab-pane fade" id="pending" role="tabpanel" >
            <PendingSection />
          </div>
        </div>
    </div>
  </div>
  );
}