import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import http from "http";
import { Server } from "socket.io";
import session from "express-session";
import cors from "cors";
import * as dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import handleStudentLogin from "./auth-new/studentLogin.js";
import handleStudentRegister from "./auth-new/studentRegister.js";
import handleDriverLogin from "./auth-new/driverLogin.js";
import addDriver from "./auth-new/addDriver.js";
import handleAdminLogin from "./auth-new/adminLogin.js";
import dummyAdmin from "./auth-new/dummyAdmin.js";
import handleLogout from "./auth-new/logout.js";
import handleAddBus from "./auth-new/addBus.js";
import getBusTable from "./auth-new/getBusTable.js";
import removeBus from "./auth-new/removeBus.js";
import adminView from "./auth-new/adminView.js";
import getStudentTable from "./auth-new/studentTable.js";
import studentView from "./auth-new/studentView.js";
import studentRegister from "./auth-new/studentRegisterBus.js";
import studentUnregister from "./auth-new/studentUnregister.js";

dotenv.config();

const { URI, PORT, SECRET_ACCESS_TOKEN, REFRESH_ACCESS_TOKEN } = process.env;

mongoose
  .connect(URI, { useUnifiedTopology: true }) // useNewUrlParser removed
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err)); // console.error for errors

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  optionSuccessStatus: 200,
};

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(
  session({
    secret: "your-secret-key", // **CRITICAL:** Change this to a strong, random secret in production!
    resave: false,
    saveUninitialized: true,
  })
);

app.post("/student/login", handleStudentLogin);

app.post("/student/register", handleStudentRegister);

app.get("/student/get-table", getStudentTable);

app.post("/student/view", studentView);

app.post("/student/register-bus", studentRegister)

app.post("/student/unregister-bus", studentUnregister)

app.post("/driver/login", handleDriverLogin);

app.post("/admin/add-driver", addDriver);

app.post("/admin/login", handleAdminLogin);

app.post("/admin/add-bus", handleAddBus);

app.post("/admin/remove-bus", removeBus);

app.post("/view", adminView);

app.get("/admin/get-table", getBusTable);

app.get("/dummy/admin", dummyAdmin);

app.post("/logout", handleLogout);

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
