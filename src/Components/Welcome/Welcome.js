import React from "react";
import style from "./Welcome.module.css";
function Welcome() {
  return (
    <div className={style.container}>
      <h1>Welcome !!</h1>
      <h3>Select the candidate to see details </h3>
    </div>
  );
}

export default Welcome;
