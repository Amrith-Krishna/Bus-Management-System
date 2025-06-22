import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const adminSchema = new mongoose.Schema(
  {
    id: String,
    password: String,
    name: String,
  },
  { timestamps: true }
);

adminSchema.pre("save", function (next) {
  const admin = this;

  if (!admin.isModified("password")) return next();

  bcrypt.hash(admin.password, 10, (err, hash) => {
    if (err) return next(err);

    admin.password = hash;
    next();
  });
});

export const Admin = mongoose.model("Admin", adminSchema);