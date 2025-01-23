interface SortableColumnProps {
  title: string;
  isSorted?: boolean;
  sortDirection?: 'asc' | 'desc';
  handleSort?: () => void;
  removeSort?: () => void;
  allowRemoveSort?: boolean;
}

export default function SortableColumn({
  title,
  isSorted,
  sortDirection,
  handleSort
}: SortableColumnProps) {
  const descending = "bi bi-caret-down-fill me-1";
  const ascending = "bi bi-caret-up-fill me-1";
  const nonSortedState = "bi bi-caret-down me-1";

  let caretClass = nonSortedState;

  if (isSorted) {
    caretClass = sortDirection === 'asc' ? ascending : descending;
  }

  return (
    <div className="d-flex align-items-center">
      {title}
      <div className="caret-container" role="status" onClick={handleSort}>
        <i className={caretClass}></i>
      </div>
    </div>
  );
}
