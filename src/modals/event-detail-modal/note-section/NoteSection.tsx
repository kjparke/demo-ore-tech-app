import { useCallback, useEffect, useState } from "react";
import NoteSection from "../../../shop-view/notes/NoteSection";
import { useEventDetailModalContext } from "../EventDetailContext";
import noteServiceInstance from "../../../services/note.service";
import AddNote from "../../../shop-view/notes/AddNote";

export default function NotesColumn() {
	const { asset } = useEventDetailModalContext();
	const [notes, setNotes] = useState([]);

  const handleSavedNote = async () => {
    await fetchEventNotes();
  };

	const fetchEventNotes = useCallback(async () => {
    if (asset.activeEvent._id !== "") {
			const notes = await noteServiceInstance.readNotes(asset.activeEvent._id);
    	setNotes(notes.data);
		}
  }, [asset.activeEvent._id]);

	useEffect(()=>{
		fetchEventNotes();
	}, [fetchEventNotes]);

  return (
		<>
			<NoteSection notes={notes} />
			<AddNote 
				id={asset.activeEvent._id} 
				onNoteSaved={ handleSavedNote } />
		</>
	);
}
