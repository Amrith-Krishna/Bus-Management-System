import { Student } from "../models/student.js";
import { Bus } from "../models/bus.js";

const studentView = async (req, res) => {
  const { busId, reg } = req.body;
  console.log(req.body);

  if (req.session.role != "student") {
    res.status(501).json({ success: false, message: "Unauthorized User" });
  } else {
    const student = Student.findOne({ reg });
    if (!student)
      res.status(501).json({ success: false, message: "Student not found" });
    else if (student.booked)
      res.status(501).json({ success: false, message: "Already registered" });
    else {
      const bus = await Bus.findOne({busId});
      if (!bus) {
        res
          .status(400)
          .json({
            success: true,
            alloc: false,
            message: "Bus Not Allocated Yet",
          });
      } else {
        const list = [];
        var available = 60;
        bus.seats.forEach((s) => list.push({ seat: s }));
        bus.registered.forEach((s, i) => {
          list[i] = { ...list[i], occ: !s.name==""};
          if (s.name != "") {
            available--;
          }
        });
        console.log({
          success: true,
          list,
          driver: bus.driver,
          driverId: bus.driverId,
          route: bus.route,
          busNum: bus.busNum,
          available,
        });
        res.json({
          success: true,
          list,
          driver: bus.driver,
          driverId: bus.driverId,
          route: bus.route,
          busNum: bus.busNum,
          available,
        });
      }
    }
  }
};

export default studentView;
