import "./card.css";
import { SetStateAction, useEffect, useState } from "react";
import { AHSCalibrationRecord } from "../interfaces/AHSCalibrationRecord";
import AHSCalibrationCardContent from "./AHSCalibrationCardContent";
import { useAuth } from "../auth/AuthContext";
import API from "../Api";

interface AHSCalibrationCardProps {
  ahsRecord: AHSCalibrationRecord;
  setAHSCalibrationRecords: React.Dispatch<
    SetStateAction<AHSCalibrationRecord[]>
  >;
}

export default function AHSCalibrationCard(props: AHSCalibrationCardProps) {
  const initialAHSRecord = { ...props.ahsRecord };
  const [isEditable, setIsEditable] = useState(false);
  const [isArchived, setIsArchived] = useState(false);
  const [savedAHSRecord, setSavedAHSRecord] = useState(props.ahsRecord);
  const { user } = useAuth();

  const handleReset = () => {
    setSavedAHSRecord(initialAHSRecord);
  };

  const handleUpdate = async () => {
    const payload = {
      data: { ...savedAHSRecord, lastUpdatedBy: user?.id },
      metaData: user,
    };
    try {
      const response = await API.patch("/ahsCalibrations/", payload);
      props.setAHSCalibrationRecords((prevRecords) => {
        return prevRecords.map((record) =>
          record._id === response.data._id ? response.data : record
        );
      });
      toggleEdit();
      setSavedAHSRecord(response.data);
    } catch (error) {
      console.log({ Error: error });
    }
  };

  const handleDelete = async () => {
    try {
      const response = await API.delete(
        `/ahsCalibrations/${props.ahsRecord._id}`
      );
      const deletedRecord = response.data;
      props.setAHSCalibrationRecords((prev) =>
        prev.filter((record) => record._id !== deletedRecord._id)
      );
    } catch (error) {
      console.log({ Error: error });
    }
  };

  const handleArchive = async () => {
    const payload = {
      data: {
        ...savedAHSRecord,
        isArchived: savedAHSRecord.isArchived ? false : true,
        lastUpdatedBy: user?.id,
      },
      metaData: user,
    };
    try {
      const response = await API.patch("/ahsCalibrations/", payload);
      const archivedRecord = response.data;
      props.setAHSCalibrationRecords((prev) =>
        prev.filter((record) => record._id !== archivedRecord._id)
      );
    } catch (error) {}
  };

  const toggleEdit = () => {
    setSavedAHSRecord(initialAHSRecord);
    setIsEditable((prev) => !isEditable);
  };

  const isFormInvalid = props.ahsRecord.unitId.length <= 0;

  const editButton = (
    <button
      className="btn btn-light"
      style={{ width: "1rem", height: "2rem", padding: 0 }}
      onClick={toggleEdit}
      aria-label="Edit"
    >
      <i className="bi bi-pencil-square me-1" style={{ fontSize: "1rem" }}></i>
      {isEditable ? "Cancel" : "Edit"}
    </button>
  );

  const archiveButton = (
    <button
      className="btn btn-light"
      style={{ width: "1rem", height: "2rem", padding: 0 }}
      onClick={handleArchive}
      aria-label="Edit"
    >
      <i className="bi bi-archive-fill me-1" style={{ fontSize: "1rem" }}></i>
      {isArchived ? "Set Active" : "Complete"}
    </button>
  );

  const deleteButton = (
    <button
      className="btn btn-danger"
      style={{ width: "1rem", height: "2rem", padding: 0 }}
      onClick={handleDelete}
      aria-label="Delete"
    >
      <i className="bi bi-trash" style={{ fontSize: "1rem" }}></i>
      Delete
    </button>
  );

  const cardToolbar = (
    <div className="row">
      <div className="d-flex justify-content-md-end">
        <div className="col-1">{editButton}</div>
        <div className="col-1">{archiveButton}</div>
        {/* <div className="col-1">{deleteButton}</div> */}
      </div>
    </div>
  );

  useEffect(() => {
    setIsArchived(props.ahsRecord.isArchived);
  }, [props.ahsRecord.isArchived]);

  return (
    <div className="card mt-4">
      <div className="card-body">
        {cardToolbar}

        <AHSCalibrationCardContent
          ahsRecord={savedAHSRecord}
          setAHSCalibrationRecord={setSavedAHSRecord}
          isForm={isEditable}
        />
      </div>
      {isEditable && (
        <div className="row">
          <div className="col d-flex justify-content-md-end">
            <button className="btn btn-inverse me-2" onClick={handleReset}>
              Discard Changes
            </button>
            <button
              className="btn btn-primary"
              onClick={handleUpdate}
              disabled={isFormInvalid}
            >
              Update
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
