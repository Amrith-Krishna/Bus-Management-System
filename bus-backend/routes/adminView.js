import { Bus } from "../models/bus.js";
import { Admin } from "../models/admin.js";
import { Driver } from "../models/driver.js";

const adminView = async (req, res) => {
  const { busId, id } = req.body;
  console.log(req.body);

  if (req.session.role != "admin" && req.session.role != "driver") {
    res.status(501).json({ success: false, message: "Unauthorized User" });
  } else if (req.session.role == "admin") {
    const admin = await Admin.findOne({ id });
    if (!admin) {
      res
        .status(500)
        .json({ success: false, message: "Unauthorized Admin ID" });
    } else {
      const bus = await Bus.findOne({ busId });
      if (!bus) {
        res.status(400).json({ success: false, message: "Bus Not Found" });
      } else {
        const list = [];
        var available = 60;
        bus.seats.forEach((s) => list.push({ seat: s }));
        bus.registered.forEach((s, i) => {
          list[i] = { ...list[i], name: s.name, reg: s.reg };
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
  } else if (req.session.role == "driver") {
    const driver = await Driver.findOne({ id });
    if (!driver) {
      res
        .status(500)
        .json({ success: false, message: "Unauthorized Driver ID" });
    } else {
      const bus = await Bus.findOne({ driverId: driver.id });
      if (!bus) {
        res.status(400).json({ success: true, alloc: false, message: "Bus Not Allocated Yet" });
      } else {
        const list = [];
        var available = 60;
        bus.seats.forEach((s) => list.push({ seat: s }));
        bus.registered.forEach((s, i) => {
          list[i] = { ...list[i], name: s.name, reg: s.reg };
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
          alloc: true,
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

export default adminView;
