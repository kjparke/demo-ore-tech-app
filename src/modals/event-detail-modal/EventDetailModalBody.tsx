import EventDetailSection from "./event-detail-form/EventDetailForm";
import NotesColumn from "./note-section/NoteSection";
import ShiftSummaryColumn from "./shift-summary-section/ShiftSummaryColumn";

export default function EventDetailModalBody() {
  return (
		<div className="row">
			<div className="col-4">
				<EventDetailSection /> 
			</div>
			<div className="col-4">
				<NotesColumn />
			</div>
			<div className="col-4">
				<ShiftSummaryColumn />
			</div>
		</div>
	);
}
