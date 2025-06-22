import React, { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navigate } from "react-router-dom";
import "./StudentLogin.css";

const VALID_USER = /^[0-9]{2}[A-Z]{3}[0-9]{4}$/;
const VALID_PASS = /^[ A-Za-z0-9_@./#&+-]{8,16}$/;
const VALID_NAME = /^[A-Za-z]{1}[A-Za-z\s]*$/;
const NAME_REG = /[^A-Za-z\s]/g;

function StudentSignUp() {
  const useFocus = () => {
    const htmlElRef = useRef(null);
    const setFocus = () => {
      htmlElRef.current && htmlElRef.current.focus();
    };

    return [htmlElRef, setFocus];
  };

  const [reg, setReg] = useState("");
  const [validReg, setValidReg] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [verify, setVerify] = useState("");
  const [match, setMatch] = useState(false);
  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);
  const [login, setLogin] = useState(false);
  const [error, setError] = useState("");
  const [init, setInit] = useState(false);
  const [passwordRef, setPasswordFocus] = useFocus();
  const [nameRef, setNameFocus] = useFocus();
  const [matchRef, setMatchFocus] = useFocus();
  const [regRef, setRegFocus] = useFocus();

  const invalidPassword =
    "Password must be 8 to 16 characters long with only alphanumeric or special characters";
  const invalidMatch = "Password and verify password must match";
  const invalidName =
    "Name cannot be empty and must contain only alphabets and spaces";

  useEffect(() => {
    setValidReg(VALID_USER.test(reg));
  }, [reg]);

  useEffect(() => {
    setValidName(VALID_NAME.test(name));
  }, [name]);

  useEffect(() => {
    setRegFocus();
    setInit(false);
  }, []);

  useEffect(() => {
    setValidPassword(VALID_PASS.test(password));
  }, [password]);

  useEffect(() => {
    setMatch(verify === password);
  }, [password, verify]);

  useEffect(() => {
    setInit(true);
  }, [password, verify, reg, name]);

  const register = async () => {
    console.log("registering");
    setError("Loading...");
    try {
      if (!validName || !validReg || !match || !validPassword) {
        throw new Error("Invalid reg no, name or password");
      }
      const res = await fetch("http://localhost:4000/student/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reg, name, password }),
      });
      if (!res.ok) {
        const loginError = await res.json();
        throw new Error(loginError.message);
      }
      const data = await res.json();
      console.log("Login response:", data);
      if (data.success) {
        setError("Registration Complete!");
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message);
    }
  };

  const changeReg = (e) => {
    setReg(e.target.value.toUpperCase());
  };

  const changeName = (e) => {
    const currentName = e.target.value;
    setName(JSON.stringify(currentName).replace(NAME_REG, ""));
  };
  const changeVerify = (e) => {
    setVerify(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const regEnter = (e) => {
    e.preventDefault();
    if (e.key === "Enter") {
      console.log("Reg Enter");
      setNameFocus();
    }
  };

  const nameEnter = (e) => {
    e.preventDefault();
    if (e.key === "Enter") {
      setPasswordFocus();
    }
  };

  const passwordEnter = (e) => {
    e.preventDefault();
    if (e.key === "Enter") {
      setMatchFocus();
    }
  };

  const matchEnter = (e) => {
    console.log("Enter pressed");
    e.preventDefault();
    if (e.key === "Enter") {
      if (validReg && validPassword && match) register();
    }
  };

  const handleLogin = () => {
    setLogin(true);
  };

  return (
    <>
    <div id="loginPage" className="container">
      <h2>STUDENT SIGN UP</h2>
      <div className="form-group">
       <div className="inputBox">
        <input
          type="text"
          id="username"
          autoComplete="no"
          onChange={(e) => changeReg(e)}
          value={reg}
          className={validReg ? "borderbottomgreen" : "borderbottomred"}
required          ref={regRef}
          onKeyUp={(e) => {
            regEnter(e);
          }}
        ></input>
        <i>Registration Number</i>
        </div>
        {!validReg && init && (
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
          type="text"
          id="name"
          autoComplete="no"
          onChange={(e) => changeName(e)}
          value={name}
          className={validName ? "borderbottomgreen" : "borderbottomred"}
required          ref={nameRef}
          onKeyUp={(e) => {
            nameEnter(e);
          }}
        ></input>
        <i>Name</i>
        </div>
        {validReg && init && !validName && (
          <>
            <div className="small-error red">
              <FontAwesomeIcon icon={faInfoCircle} className="marginleft" />
              {invalidName}
            </div>
          </>
        )}
      </div>
      <div className="form-group">
        <div className="inputBox">
        <input
          type="password"
          id="password"
          className={validPassword ? "borderbottomgreen" : "borderbottomred"}
          autoComplete="no"
          onChange={(e) => changePassword(e)}
          value={password}
required          ref={passwordRef}
          onKeyUp={(e) => {
            passwordEnter(e);
          }}
        ></input>
        <i>Password</i>
        </div>
        {validReg && validName && !validPassword && init && (
          <>
            <div className="small-error red">
              <FontAwesomeIcon icon={faInfoCircle} className="marginleft" />
              {invalidPassword}
            </div>
          </>
        )}
      </div>
      <div className="form-group">
        
        <div className="inputBox">
        <input
          type="password"
          id="verify"
          autoComplete="no"
          onChange={(e) => changeVerify(e)}
          value={verify}
          className={match ? "borderbottomgreen" : "borderbottomred"}
required          ref={matchRef}
          onKeyUp={(e) => {
            matchEnter(e);
          }}
        ></input>
        <i>Confirm Password</i>
        </div>
        {validReg && validName && validPassword && !match && init && (
          <>
            <div className="small-error red">
              <FontAwesomeIcon icon={faInfoCircle} className="marginleft" />
              {invalidMatch}
            </div>
            
          </>
        )}
      </div>
      <div className="buttonAndError">
      <button
        className="login-button"
        onClick={() => register()}
        disabled={!validReg || !validPassword || !match ||!validName}
      >
        Register
      </button>
      <div className={error == '' ? 'hide': 'error'}>{error}</div>
      </div>
      <p className="register" onClick={handleLogin}>Already registered? Log in</p>
      </div>
      {login && <Navigate to="/student/login" push={true} />}
      </>
  );
}

export default StudentSignUp;
