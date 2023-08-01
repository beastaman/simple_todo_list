import { ReactComponent as SuccessIcon } from "assets/icon/check-success.svg";
import { ReactComponent as DropdownIcon } from "assets/icon/dropdown-icon.svg";
import Logo from "assets/logo/logo.png";
import LogoComponent from "components/LogoComponent";
import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";

const Header = () => {
  const [theme, setTheme] = useState("light");

  /**
   * Handle change theme
   */
  useEffect(() => {
    const currentTheme = localStorage.getItem("theme");

    if (currentTheme) {
      document.documentElement.setAttribute("data-theme", currentTheme);

      setTheme(currentTheme);
    }
  }, []);

  const handleChangeTheme = (type) => {
    if (type === "light") {
      setTheme("light");
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    } else {
      setTheme("dark");
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <header id="header" className="header">
      <div className="header-left">
        <div
          className="header-logo"
          style={{ backgroundImage: `url(${Logo})` }}
          onClick={() =>
            (window.location.href = "https://nvanha.github.io/myweb/")
          }
        />
        <div className="header-title">
          <LogoComponent size={20} /> Task List
        </div>
      </div>

      <div className="header-right">
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {theme === "light" ? "Light" : "Dark"}
            <DropdownIcon />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleChangeTheme("light")}>
              Light
              {theme === "light" && <SuccessIcon />}
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleChangeTheme("dark")}>
              Dark
              {theme === "dark" && <SuccessIcon />}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </header>
  );
};

export default Header;
