import { useState } from "react";
import noteServiceInstance from "../../services/note.service";
import { useAuth } from "../../auth/AuthContext";

interface AddNoteProps {
    id: string
    onNoteSaved: () => void 
}

export default function AddNote (props: AddNoteProps) {
  const [text, setText] = useState<string>("");
  const { user } = useAuth();

  const handleAddNote = async () => {
    const newNote = {
      text: text,
      eventId: props.id,
      userId: user ? user.id : "InvalidUser",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      const payload = {
        data: newNote, 
        metaData: user,
      }
      await noteServiceInstance.createNote(payload);
      props.onNoteSaved(); 
      setText(""); 
    } catch (error) {
      console.error("Error adding note:", error);
    }
  }

  return (
    <div className="add-note-view shadow p-3 mt-3 rounded">
      <div>
        <textarea 
            className="form-control" 
            placeholder="Add a new note" 
            id="add-note-textfield"
            rows={3}
            value={text}
            onChange={(event) => setText(event.target.value)}
        ></textarea>
        <button type="button" className="btn btn-secondary mt-3" onClick={ handleAddNote }>
          Add Note
        </button>
      </div>
    </div>
 )
}