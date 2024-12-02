import Modal from "../components/Modal";
import { Link } from "react-router-dom";

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
          <div className="right-half">
            <img src="/dalogo2.png" alt="" />
            <h2 className="poppins-light">AFMIS PORTAL</h2>
            <form action="/" className="login-form">
              <input
                type="text"
                placeholder="Username"
                className="roboto-light"
              />
              <input
                type="text"
                placeholder="Password"
                className="roboto-light"
              />
              <button className="login-submit">Submit</button>
            </form>
            <div className="open-registration roboto-regular">
              Create an account
            </div>
          </div>
        </>
      }
    />
  );
}
