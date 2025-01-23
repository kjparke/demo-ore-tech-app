// import { useCallback, useEffect, useState } from "react";
// import { Note } from "../../interfaces/Note";
// import noteServiceInstance from "../../services/note.service";
// import { useModalState } from "../ModalStateContext";
// import Modal from "../Modal";
// import { MODAL_ID } from "../../constants/GeneralConstants";
// import { parseAssetId } from "../../helpers/AssetHelpers";
// import NoteSection from "../../shop-view/notes/NoteSection";
// import AddNote from "../../shop-view/notes/AddNote";

// interface EventDetailModalProps {
//   onClose: () => void;
// }

// export default function NotesModal({ onClose }: EventDetailModalProps) {
//   const [notes, setNotes] = useState<Note[]>([]);
//   const { selectedAsset, showNotesModal } = useModalState();

//   const fetchNotes = useCallback(async () => {
//     if (selectedAsset) {
//       const notes = await noteServiceInstance.readNotes(
//         selectedAsset.activeEvent._id
//       );
//       setNotes(notes.data);
//     }
//   }, [selectedAsset]);

//   const handleSavedNote = async () => {
//     fetchNotes();
//   };

//   useEffect(() => {
//     fetchNotes();
//   }, [fetchNotes]);

//   if (!showNotesModal || !selectedAsset) return null;

//   return (
//     <Modal size="sm" modalId={MODAL_ID.NOTE_MODAL}>
//       <div className="mb-3">
//         <div className="modal-header">
//           <h4 className="modal-title fw-bold ps-3">
//             {parseAssetId(selectedAsset.unitId)}
//           </h4>
//           <div
//             className={`ms-5 secondary-status-chip status-${selectedAsset.status}`}
//           >
//             <p className="mb-0">{selectedAsset.activeEvent.secondaryStatus}</p>
//           </div>
//           <button
//             type="button"
//             className="btn-close"
//             data-bs-dismiss="modal"
//             aria-label="Close"
//           ></button>
//         </div>
//         <div className="modal-body">
//           <div className="note-section-modal">
//             <NoteSection notes={notes} />
//           </div>
//           <AddNote
//             id={selectedAsset.activeEvent._id}
//             onNoteSaved={handleSavedNote}
//           />
//         </div>
//         <div className="modal-footer d-flex justify-content-between">
//           <button
//             type="button"
//             className="btn btn-primary"
//             data-bs-dismiss="modal"
//             onClick={onClose}
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </Modal>
//   );
// }


import { useCallback, useEffect, useState } from "react";
import { Note } from "../../interfaces/Note";
import noteServiceInstance from "../../services/note.service";
import { useModalState, useModalDispatch } from "../ModalStateContext";
import Modal from "../Modal";
import { MODAL_ID } from "../../constants/GeneralConstants";
import { parseAssetId } from "../../helpers/AssetHelpers";
import NoteSection from "../../shop-view/notes/NoteSection";
import AddNote from "../../shop-view/notes/AddNote";

interface NotesModalProps {
  onClose: () => void;
}

export default function NotesModal({ onClose }: NotesModalProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const { selectedAsset } = useModalState();
  const dispatch = useModalDispatch();

  const fetchNotes = useCallback(async () => {
    if (selectedAsset) {
      const notes = await noteServiceInstance.readNotes(
        selectedAsset.activeEvent._id
      );
      setNotes(notes.data);
    }
  }, [selectedAsset]);

  const handleSavedNote = async () => {
    fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  if (!selectedAsset) return null;

  return (
    <Modal size="sm" modalId={MODAL_ID.NOTE_MODAL}>
      <div className="mb-3">
        <div className="modal-header">
          <h4 className="modal-title fw-bold ps-3">
            {parseAssetId(selectedAsset.unitId)}
          </h4>
          <div
            className={`ms-5 secondary-status-chip status-${selectedAsset.status}`}
          >
            <p className="mb-0">{selectedAsset.activeEvent.secondaryStatus}</p>
          </div>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={() => dispatch({ type: 'CLOSE_MODAL' })}
          ></button>
        </div>
        <div className="modal-body">
          <div className="note-section-modal">
            <NoteSection notes={notes} />
          </div>
          <AddNote
            id={selectedAsset.activeEvent._id}
            onNoteSaved={handleSavedNote}
          />
        </div>
        <div className="modal-footer d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-primary"
            data-bs-dismiss="modal"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}
