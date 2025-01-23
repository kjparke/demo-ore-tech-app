import { useEffect, useState, useCallback } from "react";
import LocationHistory from "./LocationHistory";
import StatusHistory from "./StatusHistory";
import EventDetails from "./EventDetails";
import { AssetHistorySearchResult } from "../interfaces/AssetHistorySearchResult";
import NoteSection from "../shop-view/notes/NoteSection";
import noteServiceInstance from "../services/note.service";
import AddNote from "../shop-view/notes/AddNote"; 

interface AssetHistoryModalProps {
  modalId: string;
  searchResult: AssetHistorySearchResult;
}

export default function AssetHistoryModal(props: AssetHistoryModalProps) {
  const [notes, setNotes] = useState([]);

  const fetchEventNotes = useCallback(async () => {
    if (props.searchResult) {
      const response = await noteServiceInstance.readNotes(props.searchResult._id);
      setNotes(response.data);
    }
  }, [props.searchResult]);

  useEffect(() => {
    fetchEventNotes();
  }, [fetchEventNotes]);

  const handleSavedNote = () => {
    fetchEventNotes();
  };

  return (
    <div id={props.modalId} className="modal fade" tabIndex={-1}>
      <div className="modal-dialog modal-xl modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title fw-bold ps-3">
              {props.searchResult.unitId} | Asset History
            </h4>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          {props.searchResult ? (
            <div className="modal-body asset-history-modal-container">
              <div className="row">
                <div className="col-6">
                  <EventDetails currentEvent={props.searchResult} />
                  <LocationHistory eventId={props.searchResult._id} />
                  <StatusHistory eventId={props.searchResult._id} />
                </div>
                <div className="col-6">
                  <div className="note-section-modal">
                    <NoteSection notes={notes} />
                    <AddNote id={props.searchResult._id} onNoteSaved={handleSavedNote} />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p>Refine your search dates to get more information</p>
          )}
          <div className="modal-footer d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
