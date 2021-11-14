import React from "react";
import style from "../arrow.module.scss";

export const RightArrow = ({ onClick, className = "", arrowState = "" }) => {
  return (
      <div className={`right-arr ${style[className]}`} onClick={onClick}>
        <img src="assets/icons/thin-right-arrow.svg" alt="Right Arrow" />
    </div>
  );
};
