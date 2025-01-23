import React, {
    createContext,
    useState,
    useContext,
    useCallback,
		useEffect,
  } from "react";
  import API from "../Api";
  import { AvailabilityResponse } from "../availability/AvailabilityInterfaces";
  import { StatusCountList, defaultStatusCountList } from "../footer/StatusCountInterfaces";
  
  interface AppContextType {
    availabilityData: AvailabilityResponse | null;
    statusCount: StatusCountList;
    secondaryStatuses: Array<string>;
		fetchSecondaryStatues: () => void;
		fetchCatagoryCount: () => void;
		fetchPAData: () => void;
  }
  
  export const AppContext = createContext<AppContextType>({
    availabilityData: null,
    statusCount: defaultStatusCountList,
    secondaryStatuses: [], 
		fetchSecondaryStatues: () => {},
		fetchCatagoryCount: () => {},
		fetchPAData: () => {},
  });
  
  export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => {
    const [availabilityData, setAvailabilityData] = useState<AvailabilityResponse | null>(null);
    const [statusCount, setStatusCount] = useState<StatusCountList>(defaultStatusCountList);
    const [secondaryStatuses, setSecondaryStatuses] = useState<Array<string>>([])
  
	
		const fetchSecondaryStatues = useCallback( async() => {
    try {
      const response = await API.get("/form-data/secondary-statuses");
      const data = response.data
      setSecondaryStatuses(data);
    } catch (error) {
      console.error(error);
    }
  }, []);
  
    const fetchCatagoryCount = useCallback(async () => {
      try {
        const response = await API.get('/physicalAvailability/categoryCount');
        setStatusCount(response.data);
      } catch (error) {
        console.error(error);
      }
    }, []); 
  
    const fetchPAData = useCallback(async () => {
      try {
        const response = await API.get("/physicalAvailability/");
        setAvailabilityData(response.data);
      } catch (error) {
        console.error(error);
      }
    }, []);

		useEffect(() => {
			fetchSecondaryStatues();
			fetchCatagoryCount();
			fetchPAData();
			console.count("App context rendered ")
		}, [fetchSecondaryStatues, fetchCatagoryCount, fetchPAData]);
  
    return (
      <AppContext.Provider
        value={{
          availabilityData,
          statusCount, 
					secondaryStatuses, 
					fetchSecondaryStatues, 
					fetchCatagoryCount, 
					fetchPAData
        }}
      >
        {children}
      </AppContext.Provider>
    );
  };
  
  export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
      throw new Error("useAsset must be used within a AssetProvider");
    }
    return context;
  };
  