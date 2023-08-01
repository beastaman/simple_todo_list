import React from "react";

const LogoComponent = ({ size }) => (
  <span
    aria-label="✔️"
    className="logo-component"
    style={{ display: "inline-block", fontSize: size }}
  >
    ✔️
  </span>
);

export default LogoComponent;
