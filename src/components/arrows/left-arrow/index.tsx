import React from "react";
import style from "../arrow.module.scss";

export const LeftArrow = ({ onClick, className = "", arrowState = "" }) => {
  return (
      <div className={`left-arr ${style[className]}`} onClick={onClick}>
        <img src="assets/icons/thin-left-arrow.svg" alt="Left Arrow" />
    </div>
  );
};
