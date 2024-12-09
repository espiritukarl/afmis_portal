import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import "../styles/dropdown.css";
import { menuItems } from "../components/Data/MenuItems";
import Modal from "../components/Modal";
import { Icon } from "@iconify/react";

export default function Navbar() {
  const [visibleDropdown, setVisibleDropdown] = useState(null);
  const [visibleSubDropdown, setVisibleSubDropdown] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isActive, setIsActive] = useState(() => {
    return localStorage.getItem("activeMenu") || "Home";
  });

  useEffect(() => {
    localStorage.setItem("activeMenu", isActive);
  }, [isActive]);

  const handleMouseEnter = (menu) => setVisibleDropdown(menu);
  const handleMouseLeave = () => setVisibleDropdown(null);
  const handleSubMouseEnter = (submenu) => setVisibleSubDropdown(submenu);
  const handleSubMouseLeave = () => setVisibleSubDropdown(null);

  function isExternal(menu, item) {
    if (item.external) {
      return (
        <a
          key={item.link}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="dropdown-item lato-regular"
        >
          {item.name}
          <Icon
            icon={"gridicons:external"}
            width={16}
            height={16}
            className="dropdown-icon"
          />
        </a>
      );
    }
    return (
      <Link
        key={item.link}
        to={item.link}
        className="dropdown-item lato-regular"
        onClick={() => setIsActive(menu)}
      >
        {item.name}
      </Link>
    );
  }

  //Dropdown items
  const renderMenu = (menu, items) =>
    items?.map((item, idx) => {
      if (item.submenu) {
        return (
          <li
            key={`${menu}-${item.name}-${idx}`}
            className="dropdown-item lato-regular has-submenu"
            onMouseEnter={() => handleSubMouseEnter(item.name)}
            onMouseLeave={handleSubMouseLeave}
          >
            {item.name}
            <Icon
              icon={"bxs:right-arrow"}
              height={10}
              className="dropdown-icon"
            />
            {visibleSubDropdown === item.name && (
              <ul className="dropdown-submenu">
                {renderMenu(menu, item.submenu)}
              </ul>
            )}
          </li>
        );
      } else {
        return (
          <React.Fragment key={item.name + "EXTERNAL"}>
            {isExternal(menu, item)}
          </React.Fragment>
        );
      }
    });

  //Navbar tabs
  return (
    <nav className="navbar-container lato-bold">
      <ul className="tabs">
        {Object.entries(menuItems).map(([menu, items], idx) => (
          <li
            key={`${menu}-${idx}`}
            className="navbar-item"
            id={isActive === menu ? "navbar-item-active" : ""}
            onMouseEnter={() => handleMouseEnter(menu)}
            onMouseLeave={handleMouseLeave}
            tabIndex={idx + 1}
          >
            {menu === "Home" ? (
              <Link to="/home" onClick={() => setIsActive(menu)}>
                {menu}
              </Link>
            ) : (
              menu
            )}

            {visibleDropdown === menu && items.length > 0 && (
              <ul className="dropdown-menu">{renderMenu(menu, items)}</ul>
            )}
          </li>
        ))}
        <div className="searchbar-container">
          <input
            className="navbar-searchbar roboto-thin"
            placeholder="Search here..."
            tabIndex={Object.entries(menuItems).length + 1}
          />
          <Icon
            icon={"material-symbols:search"}
            width={28}
            className="search-icon"
            color="black"
          />
        </div>
      </ul>
      <button onClick={() => setIsModalOpen(true)} className="navbar-login">
        Login
      </button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </nav>
  );
}
