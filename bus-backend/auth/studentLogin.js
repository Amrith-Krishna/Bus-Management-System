import { Student } from "../models/student.js";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import * as dotenv from "dotenv";
dotenv.config();

const { URI, PORT, SECRET_ACCESS_TOKEN, SECRET_REFRESH_TOKEN } = process.env;

export const HandleStudentLogin = async (req, res) => {
  const reg = req.body.reg;
  const password = req.body.password;

  console.log(req.body);
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
      const accessToken = await jsonwebtoken.sign(
        { reg },
        SECRET_ACCESS_TOKEN,
        { expiresIn: "900s" }
      );
      const refreshToken = await jsonwebtoken.sign(
        { reg },
        SECRET_REFRESH_TOKEN,
        { expiresIn: "14d" }
      );
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 14 * 24 * 60 * 60 * 1000,
      });
      res.json({
        success: true,
        role: "student",
        name: student.name,
        accessToken,
      });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials!" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Login error occurred" }); // More specific message
  }
};
