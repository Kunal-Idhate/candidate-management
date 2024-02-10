import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { provider, auth } from "../../Firebase/FirebaseConfig";
import { signInWithPopup } from "firebase/auth";
import GoogleButton from "react-google-button";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSignUp = () => {
    signInWithPopup(auth, provider).then((data) => {
      console.log(data);
      localStorage.setItem("userdata", JSON.stringify(data.user.email));

      navigate("/");
    });
  };
  const handleLogin = (e) => {
    e.preventDefault();
    if (formData.email.length > 0 && formData.password.length > 0) {
      localStorage.setItem("userdata", JSON.stringify(formData.email));
      navigate("/");
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("userdata")) {
      navigate("/");
    }
  });
  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <form>
          <GoogleButton
            style={{ width: "100%", marginBottom: "20px" }}
            onClick={handleSignUp}
          />
          <p style={{ textAlign: "center", margin: "10px" }}>OR</p>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your Email"
              onChange={handleChange}
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Your Password"
              onChange={handleChange}
              className={styles.input}
            />
          </div>
          <button type="button" onClick={handleLogin} className={styles.button}>
            Login
          </button>
          {error ? (
            <div className={styles.error}>
              <p>Please add emailId or Password</p>
            </div>
          ) : (
            <></>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
