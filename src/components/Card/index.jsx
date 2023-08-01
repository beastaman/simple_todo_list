import { ReactComponent as DateIcon } from "assets/icon/date-icon.svg";
import React from "react";

const Card = ({ data, children }) => (
  <div
    className={`card ${
      new Date(data.deadline).getTime() - new Date().getTime() <= 0
        ? "card-warning"
        : ""
    }`}
  >
    {children}{" "}
    <span>
      <DateIcon />
    </span>
  </div>
);

export default Card;
