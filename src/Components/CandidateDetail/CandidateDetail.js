import React, { useEffect, useState } from "react";
import styles from "./CadidateDetail.module.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function CandidateDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [candidateinfo, setCandidateinfo] = useState();
  const [toEdit, setToedit] = useState(false);
  const handleDelete = async () => {
    axios
      .delete(`https://60d5a2c2943aa60017768b01.mockapi.io/candidate/${id}`)
      .then((response) => {
        navigate("/");
      })
      .catch((error) => {
        console.log("An error occur");
      });
  };

  const handleEdit = () => {
    console.log(formData);
    axios
      .put(
        `https://60d5a2c2943aa60017768b01.mockapi.io/candidate/${id}`,
        formData
      )
      .then((response) => {
        navigate("/");
      })
      .catch((error) => {
        console.log("An error occur");
      });
  };

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

  const getData = async () => {
    const url = "https://60d5a2c2943aa60017768b01.mockapi.io/candidate";
    try {
      const response = await axios.get(url);
      const data = response.data;
      const found = data.find((obj) => obj.id == id);
      setCandidateinfo(found);
    } catch (error) {
      console.error("Failed to retrieve candidates:", error);
    }
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, [id]);

  return (
    <>
      {candidateinfo ? (
        <div className={styles.main}>
          <div className={styles.container}>
            <img
              className={styles.profilePicture}
              src={candidateinfo.profile_picture}
              alt="Profile "
            />
            {toEdit ? (
              <input
                type="file"
                name="profilePicture"
                onChange={handlePersonalDetailsChange}
              />
            ) : (
              <></>
            )}
            <h1>{candidateinfo.name}</h1>
            {toEdit ? (
              <>
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handlePersonalDetailsChange}
                />
              </>
            ) : (
              <></>
            )}
            <div className={styles.detail}>
              <label>Address:</label>
              <p>{candidateinfo.address}</p>
            </div>
            <div className={styles.detail}>
              <label>Phone:</label>
              <p>{candidateinfo.phone}</p>
            </div>
            <div className={styles.detail}>
              <label>Email:</label>
              <p>{candidateinfo.email}</p>
              {toEdit ? (
                <>
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handlePersonalDetailsChange}
                  />
                </>
              ) : (
                <></>
              )}
            </div>
            <div className={styles.detail}>
              <label>Gender:</label>
              <p>{candidateinfo.gender}</p>
              {toEdit ? (
                <>
                  <label>Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handlePersonalDetailsChange}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </>
              ) : (
                <></>
              )}
            </div>
            <div className={styles.detail}>
              {/* <label>Hobbies:</label>
              {candidateinfo.hobbies.length > 0 ? (
                <p>{candidateinfo.hobbies.join(", ")}</p>
              ) : (
                <></>
              )} */}
            </div>
            <div className={styles.detail}>
              <label>Education:</label>
              {candidateinfo.education.map((education, index) => (
                <p key={index}>
                  {education.degree} - {education.institute} (
                  {education.pass_out_year}) - {education.percentage}%
                </p>
              ))}
              {toEdit ? (
                <>
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
                </>
              ) : (
                <></>
              )}
            </div>
            <div className={styles.detail}>
              <label>Skills:</label>
              {candidateinfo.skills.map((skill, index) => (
                <p key={index}>
                  {skill.name} - {skill.experience} years
                </p>
              ))}
              {toEdit ? (
                <>
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
                </>
              ) : (
                <></>
              )}
            </div>
            <div className={styles.detail}>
              <label>Experience:</label>
              {candidateinfo.experience.map((exp, index) => (
                <div key={index}>
                  <p>Company: {exp.company}</p>
                  <p>Project: {exp.project}</p>
                  <p>Role: {exp.role}</p>
                  <p>Team Size: {exp.team_size}</p>
                  <p>
                    Duration: {exp.duration_from} - {exp.duration_to}
                  </p>
                </div>
              ))}
              {toEdit ? (
                <>
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
                </>
              ) : (
                <></>
              )}
            </div>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              {!toEdit ? (
                <button
                  onClick={() => {
                    setToedit(!toEdit);
                  }}
                >
                  Edit
                </button>
              ) : (
                <button onClick={handleEdit}>Save</button>
              )}

              <button style={{ background: "red" }} onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default CandidateDetail;
