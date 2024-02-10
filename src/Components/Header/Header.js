import React from "react";
import style from "./Header.module.css";
import { useNavigate } from "react-router-dom";
function Header() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("userdata");
    navigate("/login");
  };
  return (
    <div className={style.container}>
      <button className={style.btn} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Header;
