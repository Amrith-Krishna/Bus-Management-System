import { Admin } from "../models/admin.js";

const dummyAdmin = async (req, res) => {
  const newAdmin = new Admin({
    id: "50000",
    name: "Dummy",
    password: "password",
  });
  await newAdmin.save();
  res.json({
    success: true,
  });
};

export default dummyAdmin;
