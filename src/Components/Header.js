import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const onClickHandler = () => {};

  return (
    <Link to={"/"}>
      <div className="header" onClick={() => onClickHandler()}>
        <img
          alt="brut-logo"
          src="https://brutcommunicatie.nl/wp-content/themes/brut/assets/images/Logo-Brut_small.png"
          width="100"
          heigth="100"
        ></img>
      </div>
    </Link>
  );
}
