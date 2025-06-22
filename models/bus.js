import mongoose from "mongoose";

const busSchema = new mongoose.Schema(
  {
    busId: Number,
    busNum: String,
    driver: String,
    driverId: String,
    route: String,
    seats: [
        {type: String}
    ],
    registered: [
        {reg: String,
          name: String,
          seat: String
        }
    ]
  },
  { timestamps: true }
);

export const Bus = mongoose.model("Bus", busSchema);