import React, { useRef, useState, useEffect, useContext } from "react";
import { faCheck, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navigate } from "react-router-dom";
import "./StudentLogin.css";
import AuthContext from "./context/AuthContext";
import axios from "./api/axios";

const VALID_USER = /^[0-9]{2}[A-Z]{3}[0-9]{4}$/;

const useFocus = () => {
  const htmlElRef = useRef(null);
  const setFocus = () => {
    htmlElRef.current && htmlElRef.current.focus();
  };

  return [htmlElRef, setFocus];
};

function StudentLogin() {
  const { auth, setAuth } = useContext(AuthContext);
  const [validUser, setValidUser] = useState(false);
  const [validPass, setValidPass] = useState(false);
  const [reg, setReg] = useState("");
  const [password, setPassword] = useState("");
  const [logged, setLogged] = useState(false);
  const [error, setError] = useState("");
  const [signUp, setSignUp] = useState(false);
  const [regRef, setRegFocus] = useFocus();
  const [passwordRef, setPasswordFocus] = useFocus();

  useEffect(() => {
    setRegFocus();
  }, []);

  useEffect(() => {
    setValidUser(VALID_USER.test(reg));
    console.log(reg + ":" + validUser);
  }, [reg]);

  useEffect(() => {
    setValidPass(password.length >= 8 && password.length <= 16);
    console.log(password + ":" + validPass);
  }, [password]);

  useEffect(() => {
    setError("");
  }, [reg, password]);

  const login = async () => {
    if (!VALID_USER.test(reg) || password.length < 8 || password.length > 16) {
      setError("Invalid Reg No or Password");
      return;
    }
    setError("Loading...");
    try {
      const res = await axios.post(
        "/student/login",
        JSON.stringify({ reg, password }),
        { headers: { "Content-Type": "application/json"}, withCredentials: true }
      );
      if (!res?.ok) {
        const loginError = await res.json();
        throw new Error(loginError.message);
      }
      const data = res;
      console.log("Login response:", data);
      if (data.success) {
        setLogged(true);
        const accessToken = data?.accessToken;
        const roles = data?.roles;
        setAuth({ reg, password, roles, accessToken});
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(error?.message);
    }
  };

  const changeReg = (e) => {
    setReg(e.target.value.toUpperCase());
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const regEnter = (e) => {
    e.preventDefault();
    if (e.key === "Enter") {
      console.log("Reg Enter");
      setPasswordFocus();
    }
  };

  const passwordEnter = (e) => {
    console.log("Enter pressed");
    e.preventDefault();
    if (e.key === "Enter") {
      if (validUser) login();
      console.log("logging in");
    }
  };

  const handleSignUp = () => {
    setSignUp(!signUp);
  };

  return (
    <div id="loginPage" className="container">
      <h2>STUDENT LOGIN</h2>
      <div className="form-group">
        <div className="inputBox">
          <input
            type="text"
            id="username"
            autoComplete="yes"
            onChange={(e) => changeReg(e)}
            value={reg}
            ref={regRef}
            onKeyUp={(e) => {
              regEnter(e);
            }}
            required
          ></input>
          <i> Registration Number </i>
        </div>
        {!validUser && (
          <>
            <div className="small-error red">
              <FontAwesomeIcon icon={faInfoCircle} className="marginleft" />
              Invalid Register Number
            </div>
          </>
        )}
      </div>
      <div className="form-group">
        <div className="inputBox">
          <input
            type="password"
            id="password"
            autoComplete="yes"
            onChange={(e) => changePassword(e)}
            value={password}
            ref={passwordRef}
            onKeyUp={(e) => {
              passwordEnter(e);
            }}
            required
          ></input>
          <i>Password</i>
        </div>
      </div>
      <div className="buttonAndError">
        <button
          className="login-button"
          onClick={login}
          disabled={!validUser || !validPass}
        >
          Login
        </button>

        <div className={error != "" ? "error" : "hide"}>
          {error ? error : ""}
        </div>
      </div>
      {logged && <Navigate to="/student/user" push={true} />}
      <p className="register" onClick={handleSignUp}>
        Sign Up/Register
      </p>
      {signUp && !logged && <Navigate to="/student/signup" push={true} />}
    </div>
  );
}

export default StudentLogin;
