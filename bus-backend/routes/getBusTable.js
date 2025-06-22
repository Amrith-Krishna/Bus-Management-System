import { Bus } from "../models/bus.js";

const getBusTable = async (req, res) => {
  try {
    if (req.session.role != "admin") throw new Error("Unauthorized");
    const buses = await Bus.find({});
    const list = [];
    buses.forEach((bus) =>{
        var remaining = 60;
        bus.registered.forEach((s) => {if(s.reg.length>0) remaining--;})
      list.push({
        busId: bus.busId,
        busNum: bus.busNum,
        driver: bus.driver,
        driverId: bus.driverId,
        route: bus.route,
        seats: bus.seats,
        registered: bus.registered,
        remaining
      })
  });
    list.sort((x,y) => 1000*(x.route.charCodeAt(0)-y.route.charCodeAt(0))+x.busId-y.busId);
    res.json({ success: true, list });
  } catch (error) {
    res.status(501).json({ success: false, message: error.message });
  }
};

export default getBusTable;
