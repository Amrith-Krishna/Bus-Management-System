import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const driverSchema = new mongoose.Schema(
  {
    id: String,
    password: String,
    name: String,
    route: String,
    busId: Number,
    busNum: String
  },
  { timestamps: true }
);

driverSchema.pre("save", function (next) {
  const driver = this;

  if (!driver.isModified("password")) return next();

  bcrypt.hash(driver.password, 10, (err, hash) => {
    if (err) return next(err);

    driver.password = hash;
    next();
  });
});

export const Driver = mongoose.model("Driver", driverSchema);