import React from "react";
import CandidateList from "../../Components/cadidiateList/CandidateList";
import styles from "./CandidateInfo.module.css";
import Header from "../../Components/Header/Header";
import CandidateDetail from "../../Components/CandidateDetail/CandidateDetail";

function CandidateInfo() {
  return (
    <div className={styles.home}>
      <Header />
      <div className={styles.display}>
        <CandidateList  />
        <CandidateDetail />
      </div>
    </div>
  );
}

export default CandidateInfo;
