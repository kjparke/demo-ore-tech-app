import { useEffect, useRef } from "react";
import NoteCard from "./NoteCard";
import { Note } from "../../interfaces/Note";
import { formatDate } from "../../helpers/AssetHelpers";
import { DateFormat } from "../../constants/GeneralConstants";
import { useModal } from "../../context/ShopDetailModalContext";

interface NoteSectionProps {
  notes: Note[];
  addNoteDisabled?: boolean;
}

export default function NoteSection(props: NoteSectionProps) {
const notesEndRef = useRef<HTMLDivElement>(null);
const {isModalOpen} = useModal();

  const scrollToBottom = () => {
    notesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    scrollToBottom();
  }, [props.notes]);

  useEffect(() => {
    if (isModalOpen) {
      setTimeout(() => {
        scrollToBottom();
      }, 0);
    }
  }, [isModalOpen]);

  if (props.notes.length === 0) {
    return (
      <div className={props.addNoteDisabled 
        ? "notes-view-add-disabled shadow p-3 rounded text-center"
        : "notes-view shadow p-3 rounded text-center" }>
        <p className="fw-light fst-italic">There are currently no notes for this event.</p>
      </div>
    );
  }
  
  return(
    <div className={props.addNoteDisabled 
      ? "notes-view-add-disabled shadow p-3 rounded text-center"
      : "notes-view shadow p-3 rounded text-center" }>
      {props.notes.map((note, index) => (
        <NoteCard 
          key={index}
          createdAt={formatDate(note.createdAt, DateFormat.MONTH_DAY_YEAR_HOUR)}
          user={note.userId ? `${note.userId.firstName} ${note.userId.lastName}` : "Unknown user"}
          text={note.text}
        />
      ))}
      <div ref={notesEndRef}></div>
    </div>
  );
}