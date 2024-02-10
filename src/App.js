import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage/LoginPage";
import HomePage from "./Pages/Home/HomePage";
import NewCandidate from "./Pages/NewCandidate/NewCandidate";
import CandidateData from "./context";
import { useState } from "react";
import CandidateInfo from "./Pages/CandidateInfo/CandidateInfo";
function App() {
  const [Data, setData] = useState([]);

  return (
    <>
      <CandidateData.Provider value={{ Data, setData }}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/candidate/:id" element={<CandidateInfo />} />
            <Route exact path="/candidate/new" element={<NewCandidate />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </CandidateData.Provider>
    </>
  );
}

export default App;
