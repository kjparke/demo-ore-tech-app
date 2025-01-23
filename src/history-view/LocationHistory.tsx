import "./history.css";
import { useState } from "react";
import { useEffect } from "react";
import API from "../Api";
import { LocationDelta } from "../interfaces/LocationDelta";
import { formatDate } from "../helpers/AssetHelpers";
import { DateFormat } from "../constants/GeneralConstants";

interface LocationHistoryProps {
  eventId: string;
}

export default function LocationHistory(props: LocationHistoryProps) {
  const [locationDeltas, setLocationDeltas] = useState([]);

  useEffect(() => {
    const fetchLocationHistory = async () => {
      try {
        const response = await API.get(`/location-delta/${props.eventId}`);
        setLocationDeltas(response.data);
      } catch (error) {
        console.log({ Error: error });
      }
    };

    fetchLocationHistory();
  }, [props.eventId]);

  return (
    <div className="history-table-container mt-2">
      <div>
        {locationDeltas.length > 0 ? (
          <table className="table table-striped table-bordered table-hover">
            <thead>
              <tr>
                <th scope="col">Location</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              {locationDeltas.map((locationDelta: LocationDelta) => {
                return (
                  <tr key={locationDelta._id}>
                    <td>
                      {locationDelta.location}{" "}
                      {locationDelta.bay ? `- ${locationDelta.bay}` : ""}
                    </td>
                    <td>
                      {formatDate(
                        locationDelta.createdAt,
                        DateFormat.MONTH_DAY_YEAR_HOUR
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="d-flex p-2">
            <p className="text-muted">Location history not available for this event.</p>
          </div>
        )}
      </div>
    </div>
  );
}
