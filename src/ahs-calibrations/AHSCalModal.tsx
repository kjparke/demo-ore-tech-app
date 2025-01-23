import { useEffect, useState } from "react";
import { AHSCalibrationRecord } from "../interfaces/AHSCalibrationRecord";
import AHSCalibrationCardContent from "./AHSCalibrationCardContent";
import API from "../Api";
import { useAuth } from "../auth/AuthContext";
import UserActivityDetails from "./UserActivityDetails";

interface AHSCalModalProps {
  modalId: string;
  record: AHSCalibrationRecord;
  fetchData: () => void;
}

export default function AHSCalModal(props: AHSCalModalProps) {
  const [initialAHSRecord, setInitialAHSRecord] = useState(props.record);
  const [savedAHSRecord, setSavedAHSRecord] = useState(props.record);
  const [isChanged, setIsChanged] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    setInitialAHSRecord(props.record);
    setSavedAHSRecord(props.record);
    setIsChanged(false);
  }, [props.record]);
  const handleReset = () => {
    setSavedAHSRecord(initialAHSRecord);
  }

  const handleSave = async () => {
    const payload = {
      data: { ...savedAHSRecord, lastUpdatedBy: user?.id },
      metaData: user,
    };
    try {
      const response = await API.patch("/ahsCalibrations/", payload);
      if (response.status === 200 || response.status === 204) {
        console.log("Archiving successful, refreshing data...");
        props.fetchData();
      } else {
        console.error('Failed to archive the record, received status:', response.status);
      }
    } catch (error) {
      console.log({ Error: error });
    }
  }

  const handleCreateNewCal = async () => {
    const newAHSRecord = {...savedAHSRecord, createdBy: user?.id, lastUpdatedBy: user?.id, completedBy: undefined};
    const payload = {
      data: newAHSRecord,
      metaData: user,
    }
    try {
      const response = await API.post("/ahsCalibrations/", payload);
      if (response.status === 200 || response.status === 204) {
        props.fetchData();
      } else {
        console.error('Failed to archive the record, received status:', response.status);
      }
    } catch(error) {
      console.log({Error: error});
    }
  }

  const handleDelete = async () => {
    try {
      await API.delete(
        `/ahsCalibrations/${props.record._id}`
      );
      props.fetchData()
    } catch (error) {
      console.log({ Error: error });
    }
  };

  const handleArchive = async (value: boolean) => {
    const payload = {
      data: {
        ...savedAHSRecord,
        isArchived: value,
        lastUpdatedBy: user?.id,
        completedBy: user?.id,
        completedAt: new Date(),
      },
      metaData: user,
    };
    try {
      const response = await API.patch("/ahsCalibrations/", payload);
      if (response.status === 200 || response.status === 204) {
        console.log("Archiving successful, refreshing data...");
        props.fetchData();
      } else {
        console.error('Failed to archive the record, received status:', response.status);
      }
    } catch (error) {
      console.error("Error archiving record:", error);
    }
  }

  const isNewCal = props.record._id.length === 0;

  useEffect(() => {
    const hasChanged = JSON.stringify(initialAHSRecord) !== JSON.stringify(savedAHSRecord);
    setIsChanged(hasChanged);
  }, [savedAHSRecord, initialAHSRecord]);

  return (
    <div id={props.modalId} className="modal fade">
      <div className="modal-dialog modal-xl modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title fw-bold ps-3">{props.record.unitId} {isNewCal && " - New Calibration Record"}</h4>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <AHSCalibrationCardContent ahsRecord={savedAHSRecord} setAHSCalibrationRecord={setSavedAHSRecord} isForm/>
            <div className="mt-2">
            {!isNewCal && 
              <UserActivityDetails 
              createdBy={props.record.createdBy}
              lastUpdatedBy={props.record.lastUpdatedBy}
              completedBy={props.record.completedBy}
              createdAt={props.record.createdAt}
              updatedAt={props.record.updatedAt}
              completedAt={props.record.completedAt}
            />
            }
            </div>
          </div>
          <div className="modal-footer d-flex justify-content-end">
            {isChanged &&
              <button type="button" className="btn btn-light" onClick={handleReset}>Discard Changes</button>
            }
            {isNewCal 
              ? <>
                  <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleCreateNewCal} disabled={!isChanged}>Save</button>
                </>
              : <>
                  {!props.record.isArchived && <button type="button" className="btn btn-light" data-bs-dismiss="modal" onClick={(e) => handleArchive(true)}>Complete</button>}
                  <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSave} disabled={!isChanged}>Update</button>
                  {/* <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={handleDelete}>Delete</button> */}
                </>
            }
            
          </div>
        </div>
      </div>
    </div>
  );
}
