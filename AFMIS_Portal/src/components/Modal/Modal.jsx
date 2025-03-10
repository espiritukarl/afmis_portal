import "./modal.css";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";

// Sorry for this file, I regret making it like this but it works
// This file is for the Modals - specifically LOGIN and REGISTRATION
// Need to setup an Auth for both though. Should be simple to make, but need to coordinate with ICTS since they're making an SSO together with our other systems
// RECOMMENDATION: Split the Login and Registration to separate files with its functions. I made it so 1 modal is needed for both, but then the styling and everything is different

export default function Modal({ isOpen, onClose, content = "" }) {
  const [logInModal, setLogInModal] = useState(true);

  if (!isOpen) return null;

  return (
    <div
      onClick={() => {
        onClose();
        setLogInModal(true);
      }}
      className="modal-overlay"
    >
      <div
        className={content ? "modal-general" : "modal-content"}
        onClick={(e) => e.stopPropagation()}
      >
        <Icon
          icon={"line-md:close"}
          className="modal-close-button"
          onClick={() => {
            onClose();
            setLogInModal(true);
          }}
          width={24}
        />
        <div>{content ? content : openedModal(logInModal, setLogInModal)}</div>
      </div>
    </div>
  );
}

function openedModal(isLogIn, setLogInModal) {
  if (isLogIn) {
    return (
      <>
        <div className="left-half">
          <img src="/login1.jpg" />
        </div>
        <div className="right-half">
          <a href="https://da.gov.ph/" target="_blank">
            <img src="/dalogo2.png" alt="Department of Agriculture Logo" />
          </a>
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
          <div
            className="open-registration roboto-regular"
            onClick={() => setLogInModal(false)}
          >
            Create an account
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="registration-modal">
        <a href="https://da.gov.ph/" target="_blank">
          <img src="/dalogo2.png" alt="Department of Agriculture Logo" />
        </a>
        <h2 className="poppins-light">Registration</h2>
        <form action="/" className="registration-form">
          <input type="text" placeholder="Full Name" className="roboto-light" />
          <input type="text" placeholder="Email" className="roboto-light" />
          <input type="text" placeholder="Username" className="roboto-light" />
          <input type="text" placeholder="Password" className="roboto-light" />
          <input
            type="text"
            placeholder="Re-type password"
            className="roboto-light"
          />
        </form>
        <div className="registration-buttons-container">
          <button className="roboto-medium" onClick={() => setLogInModal(true)}>
            <Icon
              icon={"icon-park-outline:left"}
              className="left-arrow-reg"
              width={15}
            />
            <span>Go back</span>
          </button>
          <button className="roboto-medium">Register</button>
        </div>
      </div>
    );
  }
}
