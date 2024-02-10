import React, { useState } from "react";
import styles from "./NewStudentForm.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function NewStudentForm({ candidates, setCandidates }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    profilePicture: "",
    name: "",
    email: "",
    gender: "",
    hobbies: [],

    education: [{ school: "", graduationYear: "" }],
    skills: [{ skillName: "", experienceMonths: "" }],
    experience: [{ company: "", project: "", role: "", duration: "" }],
  });

  // Functions to handle form changes
  const handlePersonalDetailsChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,

      [name]: value,
    }));
  };

  const handleEducationChange = (index, e) => {
    const { name, value } = e.target;
    const updatedEducation = [...formData.education];
    updatedEducation[index][name] = value;
    setFormData((prevData) => ({
      ...prevData,
      education: updatedEducation,
    }));
  };

  const handleSkillsChange = (index, e) => {
    const { name, value } = e.target;
    const updatedSkills = [...formData.skills];
    updatedSkills[index][name] = value;
    setFormData((prevData) => ({
      ...prevData,
      skills: updatedSkills,
    }));
  };

  const handleExperienceChange = (index, e) => {
    const { name, value } = e.target;
    const updatedExperience = [...formData.experience];
    updatedExperience[index][name] = value;
    setFormData((prevData) => ({
      ...prevData,
      experience: updatedExperience,
    }));
  };

  // Functions to add new entries dynamically
  const addEducationEntry = () => {
    setFormData((prevData) => ({
      ...prevData,
      education: [...prevData.education, { school: "", graduationYear: "" }],
    }));
  };

  const addSkillEntry = () => {
    setFormData((prevData) => ({
      ...prevData,
      skills: [...prevData.skills, { skillName: "", experienceMonths: "" }],
    }));
  };

  const addExperienceEntry = () => {
    setFormData((prevData) => ({
      ...prevData,
      experience: [
        ...prevData.experience,
        { company: "", project: "", role: "", duration: "" },
      ],
    }));
  };
  const handleSubmit = async () => {
    console.log(formData);
    axios
      .post("https://60d5a2c2943aa60017768b01.mockapi.io/candidate", formData)
      .then((response) => {
        console.log(response);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className={styles.main}>
      <div className={styles.formContainer}>
        <div className={styles.stepContainer}>
          <h2>Personal Details</h2>
          <div className={styles.fieldGroup}>
            <label>Profile Picture</label>
            <input
              type="file"
              name="profilePicture"
              onChange={handlePersonalDetailsChange}
            />
          </div>
          <div className={styles.fieldGroup}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handlePersonalDetailsChange}
            />
          </div>
          <div className={styles.fieldGroup}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handlePersonalDetailsChange}
            />
          </div>
          <div className={styles.fieldGroup}>
            <label>Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handlePersonalDetailsChange}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className={styles.fieldGroup}>
            <label>Hobbies</label>
            <select
              multiple
              name="hobbies"
              value={formData.hobbies}
              onChange={handlePersonalDetailsChange}
            >
              <option value="reading">Reading</option>
              <option value="gaming">Gaming</option>
              <option value="traveling">Traveling</option>
              {/* Add more hobbies as needed */}
            </select>
          </div>
        </div>

        {/* Step 2: Education */}
        <div className={styles.stepContainer}>
          <h2>Education</h2>
          {formData.education.map((edu, index) => (
            <div key={index} className={styles.fieldGroup}>
              <label>Name of School/College/Institute</label>
              <input
                type="text"
                name="school"
                value={edu.school}
                onChange={(e) => handleEducationChange(index, e)}
              />
              <label>Year of Graduation</label>
              <input
                type="text"
                name="graduationYear"
                value={edu.graduationYear}
                onChange={(e) => handleEducationChange(index, e)}
              />
            </div>
          ))}
          <button onClick={addEducationEntry}>Add Education</button>
        </div>

        {/* Step 3: Skills */}
        <div className={styles.stepContainer}>
          <h2>Skills</h2>
          {formData.skills.map((skill, index) => (
            <div key={index} className={styles.fieldGroup}>
              <label>Name of Skill</label>
              <input
                type="text"
                name="skillName"
                value={skill.skillName}
                onChange={(e) => handleSkillsChange(index, e)}
              />
              <label>Experience in months</label>
              <input
                type="text"
                name="experienceMonths"
                value={skill.experienceMonths}
                onChange={(e) => handleSkillsChange(index, e)}
              />
            </div>
          ))}
          <button onClick={addSkillEntry}>Add Skill</button>
        </div>

        {/* Step 4: Experience */}
        <div className={styles.stepContainer}>
          <h2> Experience</h2>
          {formData.experience.map((exp, index) => (
            <div key={index} className={styles.fieldGroup}>
              <label>Name of Company</label>
              <input
                type="text"
                name="company"
                value={exp.company}
                onChange={(e) => handleExperienceChange(index, e)}
              />
              <label>Name of Project</label>
              <input
                type="text"
                name="project"
                value={exp.project}
                onChange={(e) => handleExperienceChange(index, e)}
              />
              <label>Role</label>
              <input
                type="text"
                name="role"
                value={exp.role}
                onChange={(e) => handleExperienceChange(index, e)}
              />
              <label>Duration (start - end date)</label>
              <input
                type="text"
                name="duration"
                value={exp.duration}
                onChange={(e) => handleExperienceChange(index, e)}
              />
            </div>
          ))}
          <button onClick={addExperienceEntry}>Add Experience</button>
        </div>
        <button
          style={{ marginBottom: "20px", width: "200px" }}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default NewStudentForm;
