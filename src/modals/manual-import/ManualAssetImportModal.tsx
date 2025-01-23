import React, { useState, useContext, useEffect } from "react";
import assetServiceInstance from "../../services/asset.service";
import moment from "moment";
import { useAuth } from "../../auth/AuthContext";
import { OperationalAsset } from "../../interfaces/Asset";
import LocationDropdown from "../../shop-view/modals/LocationDropdown";
import BayDropdown from "../../shop-view/modals/BayDropdown";
import ModelCodeDropdown from "../../shop-view/modals/ModelCodeDropdown";
import {
  LOCATIONS,
  MAINTENANCE_STATUSES,
  MODEL_CODES,
  VALID_SHOP_BAYS,
} from "../../constants/GeneralConstants";
import { AssetContext } from "../../context/AssetContext";
import { getBayOptions } from "../../helpers/FormHelpers";
import AssetDropdown from "../../shop-view/modals/AssetDropdown";
import StatusDropdown from "../../shop-view/modals/StatusDropdown";
import SecondaryStatusDropdown from "../../shop-view/modals/SecondaryStatusDropdown";
import { Payload } from "../../interfaces/Payload";
import API from "../../Api";
import { useAppContext } from "../../context/AppContext";

interface ManualAssetImportModalProps {
  modalId: string;
}

export default function ManualAssetImportModal(props: ManualAssetImportModalProps) {
  const [operationalAssets, setOperationalAssets] = useState<OperationalAsset[] >([]);
  const [unitId, setUnitId] = useState<string>("");
  const [modelCode, setModelCode] = useState(MODEL_CODES[0]);
  const [selectedLocation, setSelectedLocation] = useState<string>(LOCATIONS.RECENT_DOWNS);
  const [selectedBay, setSelectedBay] = useState<string>("");
  const [status, setStatus] = useState<string>("down_scheduled");
  const [secondaryStatus, setSecondaryStatus] = useState<string>(MAINTENANCE_STATUSES[0]);
  const [workOrderNumber, setWorkOrderNumber] = useState<string>("");
  const [purchaseOrderNumber, setPurchaseOrderNumber] = useState("");
  const [downDate, setDownDate] = useState(moment().format("YYYY-MM-DDTHH:mm"));
  const [scheduledOutDate, setScheduledOutDate] = useState("");
  const [isFreeText, setIsFreeText] = useState(false);

  const { fetchDownAssets } = useContext(AssetContext);
  const { user } = useAuth();
  const {fetchPAData, fetchCatagoryCount} = useAppContext();

  const handleLocationChange = (newLocation: string) => {
    setSelectedLocation(newLocation);

    const bayOptions = getBayOptions(newLocation);
    const bay = bayOptions.length > 0 ? bayOptions[0]: "";

    console.info(bayOptions[0]);

    setSelectedBay(bay);

    if (!VALID_SHOP_BAYS.includes(newLocation)) {
      setSelectedBay("");
    }
  };

  const resetForm = () => {
    setUnitId("");
    setModelCode(MODEL_CODES[0]);
    setSelectedLocation(LOCATIONS.RECENT_DOWNS);
    setSelectedBay("");
    setStatus("down_scheduled");
    setSecondaryStatus(MAINTENANCE_STATUSES[0]);
    setWorkOrderNumber("");
    setPurchaseOrderNumber("");
    setDownDate(moment().format("YYYY-MM-DDTHH:mm"));
    setScheduledOutDate("");
    setIsFreeText(false);
  }

  const handleSave = async () => {
    if (!unitId.trim()) {
      alert("Unit ID cannot be empty.");
      return; 
    }
  
    try {
      const data = {
        unitId: unitId,
        status: status,
        secondaryStatus: secondaryStatus,
        location: selectedLocation,
        bay: selectedBay,
        workOrderNumber: workOrderNumber,
        purchaseOrderNumber: purchaseOrderNumber,
        downDate: downDate,
        scheduleOutDate: scheduledOutDate, 
        modelCode: modelCode,
      };

      const payload = {
        data: data,
        metaData: user
      }
  
      if (isFreeText) {
        const duplicateAsset = operationalAssets.some(asset => asset.unitId === unitId.trim());
        if (duplicateAsset) {
          setUnitId("");
          alert("You've entered a unit that already exists in Ore-Tech. Please select unit from the dropdown menu. Use free text option to add an asset that does not exist in Ore-Tech");
          return;
        }

        payload.data.modelCode = modelCode;
        await API.post("/manual-import-modal/create-asset", payload);
      } else {
        await API.post("/manual-import-modal/create-manual-event", payload);
      }
  
      fetchDownAssets();
      fetchCatagoryCount();
      fetchPAData();
      resetForm();
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        alert(`${error.response.data.message}`);
      } else {
        console.error("Error updating asset:", error);
        alert("An error occurred while updating the asset. Please try again.");
      }
    }
  };

  useEffect(() => {
    console.count("Manual asset import rendered ")
    assetServiceInstance.getOperationalAssets().then((response) => {
      if (Array.isArray(response.data)) {
        const assets: OperationalAsset[] = response.data;
        setOperationalAssets(assets);
      } else {
        console.error("Received data is not an array:", response.data);
      }
    });
  }, [setOperationalAssets, selectedLocation, selectedBay, secondaryStatus]);

  return (
    <div id={props.modalId} className="modal fade">
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title fw-bold ps-3">Manually Import Asset</h4>
          </div>
          <div className="modal-body">
            <div className="card mb-3">
              <div className="card-body">
                <AssetDropdown
                  unitId={unitId}
                  setUnitId={setUnitId}
                  operationalAssets={operationalAssets}
                  isFreeText={isFreeText}
                  setIsFreeText={ setIsFreeText }
                />
                {isFreeText &&
                  <ModelCodeDropdown 
                    modelCode={modelCode}
                    setModelCode={setModelCode}
                  />
                }
                <LocationDropdown
                  selectedLocation={selectedLocation}
                  setSelectedLocation={handleLocationChange}
                />
                <BayDropdown
                  selectedLocation={selectedLocation}
                  selectedBay={selectedBay}
                  setSelectedBay={setSelectedBay}
                  bayOptions={getBayOptions(selectedLocation)}
                />
                <StatusDropdown 
                  status={status} 
                  setStatus={setStatus}
                />
                <SecondaryStatusDropdown
                  secondaryStatus={secondaryStatus}
                  setSecondaryStatus={setSecondaryStatus}
                />
                <div className="row mb-2">
                  <label
                    htmlFor="workOrderNumber"
                    className="col-sm-4 col-form-label col-form-label-sm"
                  >
                    Work Order
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control"
                      id="workOrderNumber"
                      value={workOrderNumber}
                      onChange={(e) => setWorkOrderNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row mb-2">
                  <label
                    htmlFor="purchaseOrderNumber"
                    className="col-sm-4 col-form-label col-form-label-sm"
                  >
                    Purchase Order
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control"
                      id="purchaseOrderNumber"
                      value={purchaseOrderNumber}
                      onChange={(e) => setPurchaseOrderNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row mb-2">
                  <label
                    htmlFor="downDate"
                    className="col-sm-4 col-form-label col-form-label-sm"
                  >
                    Down Date
                  </label>
                  <div className="col-sm-8">
                  <input
                    type="datetime-local"
                    className="form-control"
                    id="downDate"
                    value={downDate}
                    max={moment().format("YYYY-MM-DDTHH:mm")}
                    onChange={(e) => setDownDate(e.target.value)}
                  />
                  </div>
                </div>
                <div className="row mb-2">
                  <label
                    htmlFor="scheduledOutDate"
                    className="col-sm-4 col-form-label col-form-label-sm"
                  >
                    Scheduled Out Date
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="date"
                      className="form-control"
                      id="scheduledOutDate"
                      value={scheduledOutDate}
                      min={moment(downDate).format("YYYY-MM-DD")}
                      onChange={(e) => setScheduledOutDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-inverse"
              data-bs-dismiss="modal"
              onClick={resetForm}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSave}
              data-bs-dismiss="modal"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
