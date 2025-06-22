import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const studentSchema = new mongoose.Schema(
  {
    reg: String,
    password: String,
    name: String,
    selectedBus: {
      busId: Number,
      route: String,
      driver: String,
      busNum: String,
    },
    selectedSeat: String,
    booked: Boolean,
    accessToken: String,
    refreshToken: String
  },
  { timestamps: true }
);

studentSchema.pre("save", function (next) {
  const student = this;

  if (!student.isModified("password")) return next();

  bcrypt.hash(student.password, 10, (err, hash) => {
    if (err) return next(err);

    student.password = hash;
    next();
  });
});

export const Student = mongoose.model("Student", studentSchema);