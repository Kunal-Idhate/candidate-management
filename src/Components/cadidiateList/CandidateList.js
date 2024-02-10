import React, { useEffect, useState } from "react";
import styles from "./CandidateList.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function CandidateList() {
  const [candidates, setCandidates] = useState([]);
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/candidate/${id}`);
  };
  const handleAdd = () => {
    navigate("/candidate/new");
  };
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
    <div className={styles.candidate_list}>
      {candidates.map((candidate) => (
        <div
          className={styles.candidate_card}
          key={candidate.id}
          onClick={() => {
            handleClick(candidate.id);
          }}
        >
          {candidate.name}
          {candidate.id}
        </div>
      ))}
      <div className={styles.addbtn}>
        <button className={styles.btn} onClick={handleAdd}>
          Add Candidate
        </button>
      </div>
    </div>
  );
}

export default CandidateList;
