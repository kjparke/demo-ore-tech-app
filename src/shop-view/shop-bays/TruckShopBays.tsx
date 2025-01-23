import './truckBay.css';
import { BAY_GROUPS} from "../../constants/GeneralConstants";
import BaySection from "./BaySection";


export default function TruckShopBays() {
  /*Custom layout requested */
  // const baySections = createBaySections(BAY_GROUPS.TRUCK, [...BAY_NUMBERS.TRUCK_SHOP_BAYS]);
  return(
    <div className="row justify-content-center pt-3">
      <div className="row justify-content-md-end g-3">
        <div className="col-sm-4 col-md-3 col-lg-auto">
          <BaySection id={11} group={BAY_GROUPS.TRUCK} />
        </div>
        <div className="col-sm-4 col-md-3 col-lg-auto">
          <BaySection id={10} group={BAY_GROUPS.TRUCK} />
        </div>
        <div className="col-sm-4 col-md-3 col-lg-auto">
          <BaySection id={9} group={BAY_GROUPS.TRUCK} />
        </div>
      </div>
      <div className="row justify-content-end g-3">
        <div className="col-sm-4 col-md-3 col-lg-auto">
          <BaySection id={18} group={BAY_GROUPS.TRUCK} />
        </div>
        <div className="col-sm-4 col-md-3 col-lg-auto">
          <BaySection id={19} group={BAY_GROUPS.TRUCK} />
        </div>
        <div className="col-sm-4 col-md-3 col-lg-auto">
          <BaySection id={20} group={BAY_GROUPS.TRUCK} />
        </div>
        <div className="col-sm-4 col-md-3 col-lg-auto">
          <BaySection id={21} group={BAY_GROUPS.TRUCK} />
        </div>
        <div className="col-sm-4 col-md-3 col-lg-auto">
          <BaySection id={22} group={BAY_GROUPS.TRUCK} />
        </div>
        <div className="col-sm-4 col-md-3 col-lg-auto">
          <BaySection id={23} group={BAY_GROUPS.TRUCK} />
        </div>
        <div className="col-sm-4 col-md-3 col-lg-auto">
          <BaySection id={24} group={BAY_GROUPS.TRUCK} />
        </div>
        <div className="col-sm-4 col-md-3 col-lg-auto">
          <BaySection id={25} group={BAY_GROUPS.TRUCK} />
        </div>
      </div>
    </div>
  );
}
