import { VALID_SHOP_BAYS } from "../../../constants/GeneralConstants";
import { getBayOptions } from "../../../helpers/FormHelpers";
import BayDropdown from "../../../shop-view/modals/BayDropdown";
import LocationDropdown from "../../../shop-view/modals/LocationDropdown";
import { useEventDetailModalContext } from "../EventDetailContext";

export default function LocationSection() {
  const { asset, setAsset } = useEventDetailModalContext();

  const handleLocationChange = (newLocation: string) => {
    const bayOptions = getBayOptions(newLocation);
    const bay = bayOptions.length > 0 ? bayOptions[0] : "";
  
    setAsset((prevState) => ({
      ...prevState,
      location: newLocation,
      activeEvent: {
        ...prevState.activeEvent,
        location: newLocation,
        bay: VALID_SHOP_BAYS.includes(newLocation) ? bay : "",
      },
    }));
  };
  
  const handleBayChange = (newBay: string) => {
    setAsset((prevState) => ({
      ...prevState,
      activeEvent: {
        ...prevState.activeEvent,
        bay: newBay,
      },
    }));
  };
  
  return (
    <>
      <LocationDropdown
        selectedLocation={asset.activeEvent.location}
        setSelectedLocation={handleLocationChange}
      />
      <BayDropdown
        selectedLocation={asset.activeEvent.location}
        selectedBay={asset.activeEvent.bay}
        setSelectedBay={handleBayChange}
        bayOptions={getBayOptions(asset.activeEvent.location)}
      />
    </>
  );
}
