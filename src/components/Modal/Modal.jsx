import { useEffect } from "react";
import "./Modal.css";

function Modal({ children, onClose }) {
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  const handleKeyDown = (event) => {
    if (event.code === "Escape") {
      onClose();
    }
  };

  const onBackdropClick = (event) => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return (
    <div className="Overlay" onClick={onBackdropClick}>
      <div className="Modal">{children}</div>
    </div>
  );
}

export default Modal;
