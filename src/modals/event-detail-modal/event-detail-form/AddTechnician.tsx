import { useCallback, useEffect, useState } from "react";
import "./event-detail-section.css";
import { useEventDetailModalContext } from "../EventDetailContext";
import API from "../../../Api";
import moment from "moment-timezone";

export default function AddTechnician() {
  const { asset } = useEventDetailModalContext();
  const [technicians, setTechnicians] = useState<Array<string>>([]);
  const [technician, setTechnician] = useState<string>("");

  const handleAddTechnician = async () => {
    if (technician.trim() !== "") {
      const updatedTechnicians = [...technicians, technician];

      setTechnicians(updatedTechnicians);

      await updateShiftRoster(
        asset.activeEvent._id,
        updatedTechnicians,
      );
      setTechnician("");
    }
  };

  const handleRemoveTechnician = async (index: number) => {
    const updatedTechnicians = [...technicians];
    updatedTechnicians.splice(index, 1);

    setTechnicians(updatedTechnicians);

    await updateShiftRoster(
      asset.activeEvent._id,
      updatedTechnicians,
    );
  };

  const updateShiftRoster = async (
    eventId: string,
    technicians: string[],
  ) => {
    try {
      const response = await API.post("/shift-roster/update", {
        eventId,
        names: technicians,
      });

      if (response.data) {
        setTechnicians(response.data.names || []);
      }
    } catch (error) {
      console.error("Error updating shift roster:", error);
    }
  };

  const fetchShiftRoster = useCallback(async () => {
    if (!asset.activeEvent._id) return;

    try {
      const response = await API.get(`/shift-roster/`, {
        params: {
          eventId: asset.activeEvent._id,
        },
      });

      if (response.data) {
        setTechnicians(response.data.names || []);
      }
    } catch (error) {
      console.error("Error fetching shift roster:", error);
    }
  }, [asset.activeEvent._id]);

  useEffect(() => {
    if (!asset.activeEvent._id) return; 
    const interval = setInterval(() => {
      const now = moment.tz('America/Vancouver'); 
      const currentTime = now.format("HH:mm");

      // Trigger fetch at 06:30 and 18:30
      if (currentTime === "6:30" || currentTime === "18:30") {
        fetchShiftRoster();
      }
    }, 60000);

    return () => clearInterval(interval); 
  }, [asset.activeEvent._id, fetchShiftRoster]);

  useEffect(() => {
    fetchShiftRoster();
  }, [fetchShiftRoster]);

  return (
    <div className="card">
      <div className="row">
        <div className="col">
          <label
            htmlFor="assignedTechnicians"
            className="col-form-label col-form-label-sm"
          >
            Assigned Technicians
          </label>
        </div>
        <div className="col-6">
          <input
            type="text"
            className="form-control"
            id="assignedTechnicians"
            value={technician}
            onChange={(e) => setTechnician(e.target.value)}
          />
        </div>
        <div className="col-2">
          <button className="plus-button" onClick={handleAddTechnician}>
            +
          </button>
        </div>
      </div>
      {technicians.length !== 0 && (
        <div className="row mt-3">
          <div className="table-wrapper">
            <table className="table technician-table table-striped table-bordered table-hover">
              <tbody>
                {technicians.map(
                  (technician, index) => (
                    <tr key={index}>
                      <td>{technician}</td>
                      <td className="remove-tech-button-column">
                        <button
                          className="plus-button"
                          onClick={() => handleRemoveTechnician(index)}
                        >
                          -
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
