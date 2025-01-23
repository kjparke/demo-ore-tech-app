import { ChangeEvent } from "react";
import LocationDropdown from "../../LocationDropdown";
import BayDropdown from "../../BayDropdown";
import AddTechnician from "../../../../modals/event-detail-modal/event-detail-form/AddTechnician";
import {
  MAINTENANCE_STATUSES,
  VALID_SHOP_BAYS,
  DOWN_STATUSES,
} from "../../../../constants/GeneralConstants";
import { getBayOptions } from "../../../../helpers/FormHelpers";
import { useModal } from "../../../../context/ShopDetailModalContext";
import moment from "moment";

export const AssetDetailSection = () => {
  const { assetDetail, setAssetDetail } = useModal();
  const today = new Date().toISOString().split("T")[0];

  const handleLocationChange = (newLocation: string) => {
    setAssetDetail((prevState) => ({
      ...prevState,
      location: newLocation,
    }));

    const bayOptions = getBayOptions(newLocation);
    const bay = bayOptions.length > 0 ? bayOptions[0] : "";

    console.info(bayOptions[0]);

    setAssetDetail((prevState) => ({
      ...prevState,
      bay: bay,
    }));

    if (!VALID_SHOP_BAYS.includes(newLocation)) {
      setAssetDetail((prevState) => ({
        ...prevState,
        bay: "",
      }));
    }
  };

  const handleBayChange = (newBay: string) => {
    setAssetDetail((prevState) => ({
      ...prevState,
      bay: newBay,
    }));
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    console.log(`Updating ${id} to ${value}`);
    setAssetDetail((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleStringInputChange = (id: string, value: string) => {
    setAssetDetail((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;
    setAssetDetail((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };

  return (
    <div>
      <div className="card mb-3">
        <div className="card-body">
          <div className="row">
            <div className="col-sm-2">
              <label
                htmlFor="workOrderNumber"
                className="col-form-label col-form-label-sm"
              >
                Work Order Number
              </label>
            </div>
            <div className="col-sm-4">
              <input
                type="text"
                className="form-control"
                id="workOrderNumber"
                value={assetDetail.workOrderNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-sm-2">
              <label
                htmlFor="purchaseOrderNumber"
                className="col-form-label col-form-label-sm"
              >
                PO Number
              </label>
            </div>
            <div className="col-sm-4">
              <input
                type="text"
                className="form-control"
                id="purchaseOrderNumber"
                value={assetDetail.purchaseOrderNumber}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="card mb-3">
        <div className="card-body">
          <div className="row mb-2">
            <label
              htmlFor="timeInCurrentStatus"
              className="col-sm-4 col-form-label col-form-label-sm"
            >
              Time in Current Status
            </label>
            <div className="col">
              <div className="form-control-plaintext" id="timeInCurrentStatus">
                {assetDetail.hoursInStatus}
              </div>
            </div>
          </div>
          <div className="row mb-2">
            <label
              htmlFor="dateDown"
              className="col-sm-4 col-form-label col-form-label-sm"
            >
              Date Down
            </label>
            <div className="col">
              <div className="form-control-plaintext" id="dateDown">
                {new Date(assetDetail.downDate).toLocaleString()}
              </div>
            </div>
          </div>
          <div className="row mb-2">
            <label
              htmlFor="scheduleOutDate"
              className="col-sm-4 col-form-label col-form-label-sm"
            >
              Scheduled Out Date
            </label>
            <div className="col">
              <input
                type="date"
                className="form-control"
                id="scheduleOutDate"
                value={
                  assetDetail.scheduleOutDate ? assetDetail.scheduleOutDate : ""
                }
                min={today}
                onChange={handleInputChange}
              />
            </div>
          </div>
          {
            moment(assetDetail.scheduleOutDate).isBefore(moment()) &&
            <div className="row">
            <label
              htmlFor="revisedOutDate"
              className="col-sm-4 col-form-label col-form-label-sm"
            >
              Revised Out Date
            </label>
            <div className="col">
              <input
                type="date"
                className="form-control"
                id="revisedOutDate"
                value={
                  assetDetail.revisedOutDate ? assetDetail.revisedOutDate : ""
                }
                min={
                  assetDetail.scheduleOutDate ? assetDetail.scheduleOutDate : ""
                }
                onChange={(e) => {
                  handleInputChange(e);
                  e.stopPropagation();
                }}
              />
            </div>
          </div>
          }
        </div>
      </div>
      <div className="card shadow mb-2">
        <div className="card-body">
          <div className="row mb-2">
            <label
              htmlFor="primaryStatus"
              className="col-sm-4 col-form-label col-form-label-sm"
            >
              Status
            </label>
            <div className="col">
              <select
                id="status"
                className="form-control"
                value={assetDetail.status}
                onChange={(e) =>
                  handleStringInputChange("status", e.target.value)
                }
              >
                <option value={DOWN_STATUSES.SCHEDULED}>Down Scheduled</option>
                <option value={DOWN_STATUSES.UNSCHEDULED}>
                  Down Unscheduled
                </option>
                <option value={DOWN_STATUSES.WAITING}>Down Waiting</option>
              </select>
            </div>
          </div>
          <div className="row mb-2">
            <label
              htmlFor="secondaryStatus"
              className="col-sm-4 col-form-label col-form-label-sm"
            >
              Secondary Status
            </label>
            <div className="col">
              <select
                id="secondaryStatus"
                className="form-control"
                value={assetDetail.secondaryStatus}
                onChange={(e) =>
                  handleStringInputChange("secondaryStatus", e.target.value)
                }
              >
                <option value="">Select a status</option>
                {MAINTENANCE_STATUSES.map((secondaryStatus) => (
                  <option key={secondaryStatus} value={secondaryStatus}>
                    {secondaryStatus}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <LocationDropdown
            selectedLocation={assetDetail.location}
            setSelectedLocation={handleLocationChange}
          />
          <BayDropdown
            selectedLocation={assetDetail.location}
            selectedBay={assetDetail.bay}
            setSelectedBay={handleBayChange}
            bayOptions={getBayOptions(assetDetail.location)}
          />
          <div className="row mb-2">
            <div className="row">
              <div className="col-md-4">
                <label htmlFor="toBeTowed" className="form-check-label">
                  To Be Towed
                </label>
                <input
                  type="checkbox"
                  className="form-check-input ms-3"
                  id="toBeTowed"
                  checked={assetDetail.toBeTowed}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="washed" className="form-check-label">
                  To Be Washed
                </label>
                <input
                  type="checkbox"
                  className="form-check-input ms-3"
                  id="washed"
                  checked={assetDetail.washed}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="toBePlanned" className="form-check-label">
                  To Be Planned
                </label>
                <input
                  type="checkbox"
                  className="form-check-input ms-3"
                  id="toBePlanned"
                  checked={assetDetail.toBePlanned}
                  onChange={handleCheckboxChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <label htmlFor="toBeScheduled" className="form-check-label">
                  To Be Scheduled
                </label>
                <input
                  type="checkbox"
                  className="form-check-input ms-2"
                  id="toBeScheduled"
                  checked={assetDetail.toBeScheduled}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div className="col-4">
                <label htmlFor="readyToBreakIn" className="form-check-label">
                  Ready To Break-In
                </label>
                <input
                  type="checkbox"
                  className="form-check-input ms-1"
                  id="readyToBreakIn"
                  checked={assetDetail.readyToBreakIn}
                  onChange={handleCheckboxChange}
                />
              </div>
              {/* <div className="col-4">
                <label htmlFor="washComplete" className="form-check-label">
                  Washed Complete
                </label>
                <input
                  type="checkbox"
                  className="form-check-input ms-1"
                  id="washComplete"
                  checked={assetDetail.washComplete}
                  onChange={handleCheckboxChange}
                />
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <div className="card shadow">
        <div className="card-body">
          {/* <AddTechnician
            technicians={assetDetail.temp_assignedTechnicians}
            setSelectedAssetDetail={setAssetDetail}
          /> */}
        </div>
      </div>
    </div>
  );
};
