import { Student } from "../models/student.js";
import bcrypt from "bcryptjs";
import * as dotenv from "dotenv";
import logger from "../winston.js";
dotenv.config();

const VALID_REG = /^[0-9]{2}[A-Z]{3}[0-9]{4}$/;
const VALID_PASS = /^[ A-Za-z0-9_@./#&+-]{8,16}$/;
const VALID_NAME = /^[A-Za-z]{1}[A-Za-z\s]*$/;
const NAME_REG = /[^A-Za-z\s]/g;

const handleStudentRegister = async (req, res) => {
  try {
    console.log(req.body);
    const { reg, name, password } = req.body;
    name.replace(NAME_REG, "");

    if (!VALID_REG.test(reg)) {
      res
        .status(400)
        .json({ success: false, message: "Invalid Reg No format" });
    }

    if (!VALID_NAME.test(name)) {
      res.status(400).json({ success: false, message: "Invalid name format" });
    }

    if (!VALID_PASS.test(password)) {
      res
        .status(400)
        .json({ success: false, message: "Invalid password format" });
    }
    const studentExists = await Student.findOne({ reg });
    if (studentExists) {
      console.log(studentExists);
      res
        .status(500)
        .json({ success: false, message: "Student already registered" });
    } else {
      const newStudent = new Student({
        reg,
        name,
        password,
        selectedSeat: null,
        booked: false,
      });
      await newStudent.save();
      res.json({ success: true, message: "Student registered successfully" });
      logger.info(`Student ${reg} registered`);
    }
  } catch (error) {
    console.error("Registration error:", error);
    res
      .status(500)
      .json({ success: false, message: "Error registering student" });
  }
};
export default handleStudentRegister;
