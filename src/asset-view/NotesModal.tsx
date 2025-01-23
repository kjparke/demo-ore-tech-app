import "./Asset.css";
import React, { useState, useEffect, useCallback } from "react";
import { Asset } from "../interfaces/Asset";
import { Note } from "../interfaces/Note";
import { parseAssetId } from "../helpers/AssetHelpers";
import NoteSection from "../shop-view/notes/NoteSection";
import AddNote from "../shop-view/notes/AddNote";
import noteServiceInstance from "../services/note.service";

interface NotesModalProps {
  modalId: string;
  asset: Asset;
}

export default function NotesModal(props: NotesModalProps) {
  const [notes, setNotes] = useState<Note[]>([]);

  const fetchNotes = useCallback(async () => {
    const notes = await noteServiceInstance.readNotes(
      props.asset.activeEvent._id
    );
    setNotes(notes.data);
  }, [props.asset.activeEvent._id]);

  const handleSavedNote = async () => {
    fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return (
    <div id={props.modalId} className="modal fade">
      <div className="modal-dialog modal-xl modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title fw-bold ps-3">
              {parseAssetId(props.asset.unitId)}
            </h4>
            <div
              className={`ms-5 secondary-status-chip status-${props.asset.status}`}
            >
              <p className="mb-0">{props.asset.activeEvent.secondaryStatus}</p>
            </div>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="note-section-modal">
              <NoteSection notes={notes} />
            </div>
            <AddNote
              id={props.asset.activeEvent._id}
              onNoteSaved={handleSavedNote}
            />
          </div>
          <div className="modal-footer d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
