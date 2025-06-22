import { Driver } from "../models/driver.js";
import bcrypt from "bcryptjs";
import * as dotenv from "dotenv";
import logger from "../winston.js";
dotenv.config();

const VALID_ID = /^[0-9]{5}$/;
const VALID_PASS = /^[ A-Za-z0-9_@./#&+-]{8,16}$/;
const VALID_NAME = /^[A-Za-z]{1}[A-Za-z\s]*$/;
const NAME_REG = /[^A-Za-z\s]/g;

const addDriver = async (req, res) => {
  try {
    console.log(req.body);
    const { id, name, password } = req.body;
    name.replace(NAME_REG, "");
    if(req.session?.role != "admin"){
        res.status(401).json({success: false, message: "Unauthorized"});
    }
    if (!VALID_ID.test(id)) {
      res
        .status(400)
        .json({ success: false, message: "Invalid ID format" });
    }

    if (!VALID_NAME.test(name)) {
      res.status(400).json({ success: false, message: "Invalid name format" });
    }

    if (!VALID_PASS.test(password)) {
      res
        .status(400)
        .json({ success: false, message: "Invalid password format" });
    }
    const driverExists = await Driver.findOne({ id });
    if (driverExists) {
      console.log(driverExists);
      res
        .status(500)
        .json({ success: false, message: "Driver already registered" });
    } else {
      const newDriver = new Driver({
        id,
        name,
        password,
        route: null,
        busNum: null,
        busId: null
      });
      await newDriver.save();
      res.json({ success: true, message: "Driver added successfully" });
      logger.info(`Driver ${id} registered`);
    }
  } catch (error) {
    console.error("Registration error:", error);
    res
      .status(500)
      .json({ success: false, message: "Error registering driver" });
  }
};
export default addDriver;
