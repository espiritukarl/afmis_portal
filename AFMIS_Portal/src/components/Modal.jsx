import "../styles/Modal.css";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function Modal({ isOpen, onClose, content }) {
  if (!isOpen) return null;

  return (
    <div onClick={onClose} className="modal-overlay">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <Icon
          icon={"line-md:close"}
          className="modal-close-button"
          onClick={onClose}
          width={24}
        />
        <div>{content}</div>
      </div>
    </div>
  );
}
