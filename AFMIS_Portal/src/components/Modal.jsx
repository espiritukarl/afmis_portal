import "../styles/Modal.css";

export default function Modal({ isOpen, onClose, content }) {
  if (!isOpen) return null;

  return (
    <div onClick={onClose} className="modal-overlay">
      <div className="modal-content">{content}</div>
    </div>
  );
}
