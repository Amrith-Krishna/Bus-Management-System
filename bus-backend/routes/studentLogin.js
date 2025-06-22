import { Student } from "../models/student.js";
import bcrypt from "bcryptjs";
import * as dotenv from "dotenv";
import logger from "../winston.js";
dotenv.config();

 const handleStudentLogin = async (req, res) => {
  const reg = req.body.reg;
  const password = req.body.password;

  logger.info(`Student ${reg} attempted to login`);

  console.log(req);
  try {
    const student = await Student.findOne({ reg });
    if (!student) {
      return res
        .status(401)
        .json({ success: false, message: "Student not found!" });
    }
    const passwordMatch = await bcrypt.compare(password, student.password);
    if (passwordMatch) {
      req.session.reg = reg;
      req.session.role = "student";
      req.session.name = student.name;
      console.log(`${reg} logged in`);
      res.json({
        success: true,
        role: "student",
        name: student.name,
        selectedBus: student.selectedBus,
        selectedSeat: student.selectedSeat,
        booked: student.booked
      });
      logger.info(`Student ${reg} logged in`);
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials!" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Login error occurred" }); 
  }
};

export default handleStudentLogin;