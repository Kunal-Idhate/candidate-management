import { createContext, useContext } from "react";
const CandidateData = createContext();

export default CandidateData;

export const CandidateState = () => {
  return useContext(CandidateData);
};
