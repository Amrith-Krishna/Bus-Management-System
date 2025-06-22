import { Bus } from "../models/bus.js";
import { Student } from "../models/student.js";
import logger from "../winston.js";

const studentUnregister = async (req, res) => {
  const { busId, reg, seat } = req.body;

  if (req.session.role != "student")
    res.status(501).json({ success: false, message: "Unauthorised" });
  else if (
    (seat.length != 2 && seat.length != 3) ||
    !/^[ABCDE]{1}[0-9]{1,2}$/.test(seat)
  ) {
    res.status(501).json({ success: false, message: "Invalid seat" });
  } else if (parseInt(seat.substring(1) > 12)) {
    res.status(501).json({ success: false, message: "Invalid seat" });
  } else {
    const student = await Student.findOne({ reg });
    if (!student)
      res.status(501).json({ success: false, message: "Student not found" });
    else if (!student.booked) {
      res.status(501).json({ success: false, message: "Student has not booked" });
    } else {
      const bus = await Bus.findOne({ busId });
      if (!bus)
        res.status(501).json({ success: false, message: "Bus not found" });
      else {
        const a = "A";
        const i =
          47 - 12 * (seat.charCodeAt(0) - a.charCodeAt(0)) +
          parseInt(seat.substring(1));
        if (bus.registered[i].reg == ""){
          res.status(400).json({ success: false, message: "Seat not registered" });
      }
        else{
            const registered = bus.registered;
            registered[i] = {reg: "", seat, name: ""};
            const modified = await Bus.findOneAndUpdate(
              { busId },
              {
                $set: {
                  registered
                },
              },
              {
                upsert: true,
                returnDocument: 'after',
              }
            )
              const modifiedStudent = await Student.findOneAndUpdate(
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
                  returnDocument: "after",
                }
              );
              logger.info(`Student ${reg} unregistered from bus ${busId}`)
              res.json({success: true, message: "Registered Successfully", selectedBus: {...modifiedStudent.selectedBus, selectedSeat: modifiedStudent.selectedSeat}})
        }
      }
    }
  }
};


export default studentUnregister;
