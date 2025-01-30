import logo from "/Header-Logo.svg";
import { Link } from "react-router-dom";
import "../styles/header.css";

export default function Header() {
  return (
    <header>
      <h1 className="poppins-medium">
        <Link to={"/"}>
          Agriculture and Fisheries Market Information System
        </Link>
      </h1>
      <a href="https://da.gov.ph/" target="_blank">
        <img src={logo} className="header-logo" alt="Header Logo" />
      </a>
    </header>
  );
}
