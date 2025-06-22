import { Admin } from "../models/admin.js";
import bcrypt from "bcryptjs";
import * as dotenv from "dotenv";
import logger from "../winston.js";
dotenv.config();

const handleAdminLogin = async (req, res) => {
  const id = req.body.id;
  const password = req.body.password;

  logger.info(`Admin ${id} attempted to login`);

  console.log(req.body);
  try {
    const admin = await Admin.findOne({ id });
    if (!admin) {
      return res
        .status(401)
        .json({ success: false, message: "Admin not found!" });
    }
    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (passwordMatch) {
      req.session.userid = id;
      req.session.role = "admin";
      req.session.name = admin.name;
      res.json({
        success: true,
        role: "admin",
        name: admin.name,
      });
      logger.info(`Admin ${id} logged in`);
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials!" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Login error occurred" }); // More specific message
  }
};

export default handleAdminLogin;
