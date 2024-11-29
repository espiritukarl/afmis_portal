import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import "../styles/dropdown.css";
import { menuItems } from "../components/Data/MenuItems";
import { Icon } from "@iconify/react";

export default function Navbar() {
  const [visibleDropdown, setVisibleDropdown] = useState(null);
  const [visibleSubDropdown, setVisibleSubDropdown] = useState(null);
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
            key={idx}
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
              <ul className="dropdown-submenu">{renderMenu(item.submenu)}</ul>
            )}
          </li>
        );
      } else {
        return <>{isExternal(menu, item)}</>;
      }
    });

  //Navbar tabs
  return (
    <nav className="navbar-container lato-bold">
      <ul className="tabs">
        {Object.entries(menuItems).map(([menu, items], idx) => (
          <li
            key={menu}
            className="navbar-item"
            id={isActive === menu ? "navbar-item-active" : ""}
            onMouseEnter={() => handleMouseEnter(menu)}
            onMouseLeave={handleMouseLeave}
            tabIndex={idx + 1}
          >
            {menu === "Home" ? (
              <a href="/home" onClick={() => setIsActive(menu)}>
                {menu}
              </a>
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
      <button className="navbar-login">Login</button>
    </nav>
  );
}
