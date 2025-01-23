import React, { ReactNode } from "react";
import { useModalState } from "./ModalStateContext";
import "./modal.css";

interface ModalProps {
  children: ReactNode;
  size: string;
  modalId: string;
}

export default function Modal({ children, size, modalId }: ModalProps) {
  const { showModal } = useModalState();
  const eventDetailModalClass = () => {
    if (size === "xxl"){
      return "event-detail-modal"
    } else {
      return `modal-${size}`;
    }
  }
  return (
    <div
      id={modalId}
      className={`modal custom-modal ${showModal ? " modal-show" : ""} `}
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className={`modal-dialog ${eventDetailModalClass()}`} role="document">
        <div className="modal-content custom-modal-content px-3 pt-3">{children}</div>
      </div>
    </div>
  );
}
