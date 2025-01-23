import "../Shop.css";

interface NoteCardProps {
  createdAt: string;
  user: string;
  text: string;
}

export default function NoteCard(props: NoteCardProps) {
  return (
    <div className="note-container mt-3">
      <div className="note-timestamp d-flex justify-content-between align-items-center text-muted">
        <small>{props.createdAt}</small>
        <small>{`${props.user}`}</small>
      </div>
      <div className="note p-3 rounded text-left-align">{props.text}</div>
    </div>
  );
}
