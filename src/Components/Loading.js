import React from "react";
import { Default } from "react-spinners-css";

import "../Styling/Loading.css";

export default function Loading() {
  return (
    <div className="loader">
      <Default color="black" />
    </div>
  );
}
