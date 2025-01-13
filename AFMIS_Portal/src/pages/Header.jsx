import logo from "/Header-Logo.svg";
import "../styles/header.css";

export default function Header() {
  return (
    <header>
      <h1 className="poppins-medium">
        Agriculture and Fisheries Market Information System
      </h1>
      <a href="https://da.gov.ph/" target="_blank">
        <img src={logo} className="header-logo" alt="Header Logo" />
      </a>
    </header>
  );
}
