import React, { useContext } from "react";
import "../Shop.css";
import { LOCATIONS } from "../../constants/GeneralConstants";
import { AssetContext } from "../../context/AssetContext";


export default function ShopBayTabs() {
  const { downAssets } = useContext(AssetContext);
  
  const getCountOfAssetsInShop = (shop: string) => downAssets.filter(asset => asset.activeEvent.location === shop).length;
  const getCountOfPendingAssets = () =>
    downAssets.filter((asset) => asset.status === "pending").length;

  return(
    <ul className="nav nav-tabs" id="shop-view-tabs" role="tablist">
      <li className="nav-item" role="presentation">
        <button 
          className="nav-link tab-link active" 
          id="truck-shop-tab"
          data-bs-toggle="tab" 
          data-bs-target="#truck-shop" 
          type="button" 
        >
          Truck Shop ({getCountOfAssetsInShop(LOCATIONS.TRUCK_SHOP)})
        </button>
      </li>
      <li className="nav-item" role="presentation">
        <button 
          className="nav-link tab-link" 
          id="aux-shop-tab" 
          data-bs-toggle="tab" 
          data-bs-target="#aux-shop" 
          type="button" 
          role="tab"
        >
          Auxiliary Shop ({getCountOfAssetsInShop(LOCATIONS.AUXILIARY_SHOP)})
        </button>
      </li>
      <li className="nav-item" role="presentation">
        <button 
          className="nav-link tab-link" 
          id="aprons-tab" 
          data-bs-toggle="tab" 
          data-bs-target="#aprons" 
          type="button" 
          role="tab"
        >
          Aprons ({getCountOfAssetsInShop(LOCATIONS.APRONS)})
        </button>
      </li>
      <li className="nav-item" role="presentation">
        <button 
          className="nav-link tab-link" 
          id="weld-tab" 
          data-bs-toggle="tab" 
          data-bs-target="#weld" 
          type="button" 
          role="tab"
        >
          Weld ({getCountOfAssetsInShop(LOCATIONS.WELD)})
        </button>
      </li>
      <li className="nav-item" role="presentation">
        <button 
          className="nav-link tab-link" 
          id="laydown-yard-tab" 
          data-bs-toggle="tab" 
          data-bs-target="#highmont" 
          type="button" 
          role="tab"
        >
          Laydown Yard ({getCountOfAssetsInShop(LOCATIONS.LAYDOWN_YARD)})
        </button>
      </li>
      <li className="nav-item" role="presentation">
        <button 
          className="nav-link tab-link" 
          id="off-site-tab" 
          data-bs-toggle="tab" 
          data-bs-target="#off-site" 
          type="button" 
          role="tab"
        >
          Off-Site ({getCountOfAssetsInShop(LOCATIONS.OFF_SITE)})
        </button>
      </li>
      <li className="nav-item" role="presentation">
        <button 
          className="nav-link tab-link" 
          id="pending-tab" 
          data-bs-toggle="tab" 
          data-bs-target="#pending" 
          type="button" 
          role="tab"
        >
          Pending ({getCountOfPendingAssets()})
        </button>
      </li>
    </ul>
  );
}
