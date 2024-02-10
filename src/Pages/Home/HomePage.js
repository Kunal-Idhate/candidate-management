import React, { useEffect } from "react";
import CandidateList from "../../Components/cadidiateList/CandidateList";
import styles from "./HomePage.module.css";
import Header from "../../Components/Header/Header";
import Welcome from "../../Components/Welcome/Welcome";
import { useNavigate } from "react-router-dom";
function HomePage() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("userdata")) {
      navigate("/login");
    }
  });

  return (
    <>
      <div className={styles.home}>
        <Header />
        <div className={styles.display}>
          <CandidateList />

          <Welcome />
        </div>
      </div>
    </>
  );
}
export default HomePage;
