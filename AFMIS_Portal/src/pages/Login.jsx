import Modal from "../components/Modal";

export default function Login({ isModalOpen, onClose }) {
  return (
    <Modal
      isOpen={isModalOpen}
      onClose={onClose}
      content={
        <>
          <div className="left-half">
            <img src="/login1.jpg" />
          </div>
          <div className="right-half">hi</div>
        </>
      }
    />
  );
}
