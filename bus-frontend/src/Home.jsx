import React, { Component, useState } from "react";
import "./Home.css";
import { Navigate } from "react-router-dom";

function Home() {
  const [role, setRole] = useState(0);

  const nav = (
    <>
      {role == 1 && <Navigate to="/student/login" replace={true} />}
      {role == 2 && <Navigate to="/driver" replace={true} />}
      {role == 3 && <Navigate to="/admin" replace={true} />}
    </>
  );

  const loginBox = (
    <div className="container">
      <h1>BUS MANAGEMENT SYSTEM</h1>
      <div className="role-container">
        <button onClick={() => setRole(1)} className="role student">
          Student
        </button>
        <button onClick={() => setRole(2)} className="role driver">
          Driver
        </button>
        <button onClick={() => setRole(3)} className="role admin">
          Admin
        </button>
      </div>
    </div>
  );

  return (
    <>
      {role == 0 && loginBox}
      {role > 0 && role < 4 && nav}
    </>
  );
}

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { changeRole: this.props.changeRole };
  }
  setRole = (role) => {
    this.state.changeRole(role);
  };
  render() {
    return (
      <div class="container">
        <h1>Bus Management System</h1>
        <div class="role-container">
          <button onClick={this.setRole(1)} class="role student">
            Student
          </button>
          <button onClick={this.setRole(2)} class="role driver">
            Driver
          </button>
          <button onClick={this.setRole(3)} class="role admin">
            Admin
          </button>
        </div>
      </div>
    );
  }
}

export default Home;
