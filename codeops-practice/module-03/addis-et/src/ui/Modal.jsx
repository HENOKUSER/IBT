import { createPortal } from "react-dom";
import { useEffect } from "react";

const Modal = ({ children, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return createPortal(
    <div
      onClick={onClose}
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "white",
          margin: "10% auto",
          padding: "1rem",
          maxWidth: "400px",
        }}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
