import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import Context from "../utils/Context";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const {user} = useContext(Context);
  const navigate = useNavigate();

  const handleEmaileChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePassword2Change = (e) => {
    setPassword2(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      localStorage.setItem('userId', user.uid);
    } catch (error) {
      console.error('Error creating user:', error.message);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="login">
      <div className="loginWrapper">
        <h2 className="loginHeader">Register</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="authFormInput"
              value={email}
              onChange={handleEmaileChange}
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="authFormInput"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div>
            <input
              type="password"
              id="password2"
              placeholder="Repeat Password"
              className="authFormInput"
              value={password2}
              onChange={handlePassword2Change}
            />
          </div>
          <div className="loginBtnsWrapper">
            <button className="loginBtn" type="submit">
              Register
            </button>
            <Link to={`/login`} className="signupLink">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
