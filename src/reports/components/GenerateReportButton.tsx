interface GenerateReportButtonProps {
    title: string;
    modalId: string;
  }
  
  export default function GenerateReportButton({ title, modalId }: GenerateReportButtonProps) {
    return (
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target={`#${modalId}`}
      >
        {title}
      </button>
    );
  }