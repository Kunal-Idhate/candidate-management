import React, { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import CandidateList from "../../Components/cadidiateList/CandidateList";
import styles from "./NewCandidate.module.css";
import axios from "axios";
import NewStudentForm from "../../Components/NewStudentForm/NewStudentForm";
function NewCandidate() {
  const [candidates, setCandidates] = useState([]);

  const getData = async () => {
    const url = "https://60d5a2c2943aa60017768b01.mockapi.io/candidate";
    try {
      const response = await axios.get(url);
      const data = response.data;
      setCandidates(data);
    } catch (error) {
      console.error("Failed to retrieve candidates:", error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className={styles.home}>
      <Header />
      <div className={styles.display}>
        <CandidateList
          
        />
        <NewStudentForm candidates={candidates} setCandidates={setCandidates} />
      </div>
    </div>
  );
}

export default NewCandidate;
