import { Driver } from "../models/driver.js";
import bcrypt from "bcryptjs";
import * as dotenv from "dotenv";
import logger from "../winston.js";
dotenv.config();

const handleDriverLogin = async (req, res) => {
  const id = req.body.id;
  const password = req.body.password;
        logger.info(`Driver ${id} attempted to login`);


  console.log(req.body);
  try {
    const driver = await Driver.findOne({ id });
    if (!driver) {
      return res
        .status(401)
        .json({ success: false, message: "Driver not found!" });
    }
    const passwordMatch = await bcrypt.compare(password, driver.password);
    if (passwordMatch) {
      req.session.userid = id;
      req.session.role = "driver";
      req.session.name = driver.name;
      console.log(`Driver ${id} logged in`);
      res.json({
        success: true,
        role: "driver",
        name: driver.name,
      });
      logger.info(`Driver ${id} logged in`);
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials!" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Login error occurred" }); 
};
}

export default handleDriverLogin;