import { Route, Routes } from "react-router-dom";
import Student from "./Student.jsx";
import StudentLogin from "./StudentLogin.jsx";
import StudentSignUp from "./StudentSignUp.jsx";
import Home from "./Home.jsx";
import { Navigate } from "react-router-dom";
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/student/signup" element={<StudentSignUp />} />
        {/*<Route path="/driver" element={<DriverLogin/>} />*/}
        {/*<Route path="/admin" element={<AdminLogin/>} />*/}
        <Route path="/student/user" element={<Student />} />
        {/*<Route path="/driver/user" element={<Driver/>} />*/}
        {/*<Route path="/admin/user" element={<Admin/>} />*/}
        <Route path="*" element={<Navigate to="/" replace={true} />} />
      </Routes>
    </div>
  );
}

export default App;
