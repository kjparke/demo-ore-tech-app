import { useEffect, useState } from "react";
import "./Shop.css";
import ShopSection from "./ShopSection";
import Availability from "../availability/Availability";
import ShopBays from "./shop-bays/ShopBays";
import { webSocketService } from "../WebSocketService";
import { LOCATIONS } from "../constants/GeneralConstants";
import LastUpdated from "../components/LastUpdated";
import API from "../Api";
import { useAsset } from "../context/AssetContext";
import FilterBar from "../asset-view/FilterBar";

export default function ShopView() {
  
  const [lastUpdated, setLastUpdated] = useState("");
  const { fetchDownAssets, filterBy, setFilterBy } = useAsset();

  useEffect(() => {
    const fetchLastUpdated = async () => {
      try {
        const response = await API.get("/physicalAvailability/lastUpdated");
        setLastUpdated(response.data.lastUpdated);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLastUpdated();
    fetchDownAssets();
  }, [fetchDownAssets, filterBy]);

  return (
    <div >
      <LastUpdated lastUpdated={lastUpdated} />
      <div className="card mb-3">
        <FilterBar filterBy={filterBy} setFilterBy={setFilterBy} />
      </div>
      <div className="row">
        <div className="col-12">
          <Availability />
        </div>
      </div>
      <div className="row">
        <div className="col-md-2">
          <ShopSection title={LOCATIONS.DOWN_IN_FIELD}/>
        </div>
        <div className="col-md-2">
          <ShopSection title={LOCATIONS.RECENT_DOWNS} />
        </div>
        <div className="col-md-2">
          <ShopSection title={LOCATIONS.SHOP_AUX_DOWNLINE} />
        </div>
        <div className="col-md-2">
          <ShopSection title={LOCATIONS.SHOP_PROD_DOWNLINE} />
        </div>
        <div className="col-md-2">
          <div className="d-grid gap-3">
            <ShopSection title={LOCATIONS.STEAM_BAY} capacity={1} />
            <ShopSection title={LOCATIONS.TIRE_SHOP} capacity={1} />
          </div>
        </div>
        <div className="col-md-2">
          <div className="d-grid gap-3">
            <ShopSection title={LOCATIONS.SHOP_READY_LINE} />
            <ShopSection title={LOCATIONS.CAL_PAD} />
          </div>
        </div>
      </div>
      <ShopBays />
    </div>
  );
}