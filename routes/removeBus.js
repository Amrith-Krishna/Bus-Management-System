import { Admin } from "../models/admin.js";
import { Student } from "../models/student.js";
import { Driver } from "../models/driver.js";
import { Bus } from "../models/bus.js";
import logger from "../winston.js";

const removeBus = async (req, res) => {
  console.log(req.body);
  if (req.session.role != "admin") {
    res.status(501).json({ success: false, message: "Unauthorised" });
  } else {
    const { id, busId } = req.body;
    const admin = await Admin.findOne({ id });
    if (!admin) {
      res.status(501).json({ success: false, message: "Unauthorised" });
    } else {
      const bus = await Bus.findOne({ busId });
      if (!bus) {
        res.status(400).json({ success: false, message: "Bus not found" });
      } else {
        const regs = [];
        bus.registered.forEach((o) => o.reg != "" && regs.push(o.reg));
        const driverId = bus.driverId;
        regs.forEach(async (reg) => {
          await Student.findOneAndUpdate(
            { reg },
            {
              $set: {
                booked: false,
                selectedSeat: "",
                selectedBus: {
                  busId: "",
                  route: "",
                  driver: "",
                  busNum: "",
                },
              },
            },
            {
              upsert: true,
            }
          );
        });
        const modifiedDriver = await Driver.findOneAndUpdate(
          { id: driverId },
          {
            $set: {
              route: "",
              busId: null,
              busNum: "",
            },
          },
          {
            upsert: true,
            returnDocument: "after",
          }
        );
        await Bus.findOneAndDelete({ busId });
        logger.info(`Admin ${id} deleted bus ${busId}`)
        res.json({ success: true });
      }
    }
  }
};

export default removeBus;
