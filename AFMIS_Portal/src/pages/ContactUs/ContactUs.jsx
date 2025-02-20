import SectionTitle from "../../components/SectionTitle";
import "./contactUs.css";

export default function ContactUs() {
  return (
    <main>
      <SectionTitle title={"Contact Us"} />
      <Address />
      <form action="">
        <FeedbackResponderType />
        <FeedbackForm />
      </form>
    </main>
  );
}

function Address() {
  return (
    <section className="address-container">
      <div className="map-wrapper"></div>
      <div className="address-info-container">
        <div className="address-info">
          <span className="left address roboto-bold">Address</span>
          <span className="right address roboto-regular">
            1st Floor, DA OSEC Building, Elliptical Road, <br />
            Diliman, Quezon City, Philippines
          </span>
        </div>
        <div className="address-info">
          <span className="left address roboto-bold">Tel. Nos.</span>
          <span className="right address roboto-regular">
            (632) 8920.2216 / 8920.4072-73 / 8920.4077 / 8926.8203
          </span>
        </div>
        <div className="address-info">
          <span className="left address roboto-bold">Fax No.</span>
          <span className="right address roboto-regular">(632) 8926.6434</span>
        </div>
        <div className="address-info">
          <span className="left address roboto-bold">Email</span>
          <span className="right address email roboto-regular">
            amas@da.gov.ph
          </span>
        </div>
      </div>
    </section>
  );
}

function FeedbackResponderType() {
  return (
    <section className="feedback-container">
      <div className="feedback-header-container">
        <h4 className="roboto-bold">Got any more questions?</h4>
        <span className="header-statement roboto-light">
          Just fill out the form below and we'll get back to you as sono as
          possible.
        </span>
      </div>
      <div className="form-header roboto-light">
        Please choose one. <span className="red-asterisk">*</span>
      </div>
      <div className="feedback-type roboto-regular">
        <div className="feedback-options">
          <input type="radio" id="farmer" value="farmer" name="feedback-type" />
          <label htmlFor="farmer">Farmer</label>
        </div>

        <div className="feedback-options">
          <input
            type="radio"
            id="businessman"
            value="businessman"
            name="feedback-type"
          />
          <label htmlFor="businessman">Businessman</label>
        </div>

        <div className="feedback-options">
          <input
            type="radio"
            id="student"
            value="student"
            name="feedback-type"
          />
          <label htmlFor="student">Student</label>
        </div>

        <div className="feedback-options">
          <input
            type="radio"
            id="researcher"
            value="researcher"
            name="feedback-type"
          />
          <label htmlFor="researcher">Researcher</label>
        </div>

        <div className="feedback-options">
          <input type="radio" id="other" value="other" name="feedback-type" />
          <label htmlFor="other">Other</label>
        </div>
      </div>
    </section>
  );
}

function FeedbackForm() {
  return (
    <section className="feedback-form-container">
      <div className="feedback-form">
        <span className="label roboto-light">
          Full Name <span className="red-asterisk">*</span>
        </span>
        <div className="fullname">
          <input
            type="text"
            placeholder="First Name"
            className="roboto-regular"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="roboto-regular"
          />
        </div>
      </div>
      <div className="feedback-form">
        <span className="label roboto-light">
          Location <span className="red-asterisk">*</span>
        </span>
        <input type="text" placeholder="Location" className="roboto-regular" />
      </div>
      <div className="feedback-form">
        <span className="label roboto-light">
          Email Address <span className="red-asterisk">*</span>
        </span>
        <input
          type="email"
          placeholder="juandelacruz@gmail.com"
          className="roboto-regular"
        />
      </div>
      <div className="feedback-form">
        <span className="label roboto-light">
          Message <span className="red-asterisk">*</span>
        </span>
        <textarea
          placeholder="Please write your message here"
          className="roboto-regular"
        ></textarea>
      </div>
      <button className="contact-us submit-form roboto-light">
        Send Message
      </button>
    </section>
  );
}
