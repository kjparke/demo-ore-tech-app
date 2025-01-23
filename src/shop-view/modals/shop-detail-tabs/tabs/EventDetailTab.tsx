import { useState, useCallback, useEffect } from "react";
import noteServiceInstance from "../../../../services/note.service";
import { useModal } from "../../../../context/ShopDetailModalContext";
import { AssetDetailSection } from "../asset-detail-section/AssetDetailSection";
import NoteSection from "../../../notes/NoteSection";
import AddNote from "../../../notes/AddNote";
import ShiftSummaryTab from "./ShiftSummaryTab";

export default function EventDetailTab() {
  const { assetDetail } = useModal();
  const [notes, setNotes] = useState([]);

  const handleSavedNote = async () => {
    // await fetchEventNotes();
  };

	// const fetchEventNotes = useCallback(async () => {
  //   const notes = await noteServiceInstance.readNotes(assetDetail.eventId);
  //   setNotes(notes.data);
  // }, [assetDetail.eventId]);

	// useEffect(()=>{
	// 	fetchEventNotes();
	// }, [fetchEventNotes]);

    return(
      <div className="row justify-content-center pt-2">
            <div className="row">
            <div className="col-7">
                <AssetDetailSection />
            </div>
            <div className="col-5">
                <NoteSection notes={notes} />
                <AddNote 
                  id={assetDetail.eventId} 
                  onNoteSaved={ handleSavedNote } />
            </div>
            {/* <div className="col-4">
              <ShiftSummaryTab />
            </div> */}
            </div>
        </div> 
    );
}
