import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import Context from "../utils/Context";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {user} = useContext(Context);
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      localStorage.setItem('userId', user.uid);
    } catch (error) {
      console.error("Error signing in:", error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('userId')) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="login">
      <div className="loginWrapper">
        <h2 className="loginHeader">Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              id="username"
              placeholder="Username"
              className="authFormInput"
              value={email}
              onChange={handleUsernameChange}
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
          <div className="loginBtnsWrapper">
            <button className="loginBtn" type="submit">
              Login
            </button>
            <Link to={`/register`} className="signupLink">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
