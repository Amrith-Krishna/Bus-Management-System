import { Bus } from "../models/bus.js";

const getStudentTable = async (req, res) => {
  try {
    if (req.session.role != "student") throw new Error("Unauthorized");
    const buses = await Bus.find({});
    const list = [];
    buses.forEach((bus) =>{
        var remaining = 60;
        bus.registered.forEach((s) => {if(s.reg.length>0) remaining--;})
      list.push({
        busId: bus.busId,
        busNum: bus.busNum,
        driver: bus.driver,
        route: bus.route,
        remaining
      })
  });
    list.sort((x,y) => 1000*(x.route.charCodeAt(0)-y.route.charCodeAt(0))+x.busId-y.busId);
    res.json({ success: true, list });
  } catch (error) {
    res.status(501).json({ success: false, message: error.message });
  }
};

export default getStudentTable;
