import { Bus } from "../models/bus.js";
import { Admin } from "../models/admin.js";
import { Driver } from "../models/driver.js";
import logger from "../winston.js";

const VALID_DRIVER_ID = /^[0-9]{5}$/;
const VALID_BUS_ID = /^[0-9]+$/;
const VALID_ROUTE = /^[a-zA-Z0-9]{2}[a-zA-Z0-9]+$/;

const handleAddBus = async (req, res) => {
  const { driverId, busId, route, busNum, id } = req?.body;
  console.log(req.body);

  if (req.session?.role != "admin") {
    console.log(req.session);
    res.status(401).json({ success: false, message: "Unauthorized session" });
  } else {
    const admin = await Admin.findOne({ id });
    const driver = await Driver.findOne({ id: driverId });
    const bus = await Bus.findOne({ busId });

    if (!admin) {
      res.status(401).json({ success: false, message: "Unauthorized ID" });
    } else if (!VALID_BUS_ID.test(busId)) {
      res
        .status(400)
        .json({ success: false, message: "Invalid Bus ID Format" });
    } else if (!VALID_DRIVER_ID.test(driverId)) {
      res
        .status(400)
        .json({ success: false, message: "Invalid Driver ID format" });
    } else if (route.length < 3) {
      res.status(400).json({ success: false, message: "Invalid Route format" });
    } else if (!driver) {
      res.status(401).json({ success: false, message: "Driver not found" });
    } else if (bus) {
      console.log(bus);
      res.status(401).json({ success: false, message: "Bus already exists" });
    } else {
      const alphs = ["E","D","C","B","A"];
      const nums = ["1","2","3","4","5","6","7","8","9","10","11","12"];
      const registered = new Array(60);
      const seats = new Array(60);
      for(var i=0;i<60;i++){
        seats[i]=alphs[Math.floor(i/12)]+nums[i%12];
        registered[i]={
          reg: "",
          name: "",
          seat: seats[i]
        };
      }
      const modifiedDriver = await Driver.findOneAndUpdate(
  { id: driverId },
  {
    $set: {
      route,
      busNum,
      busId
    },
  },
  {
    upsert: true,
    returnDocument: 'after',
  }
)
      const newBus = new Bus({
        busId,
        busNum,
        driver: driver.name,
        driverId,
        route,
        seats,
        registered
      });
      await newBus.save();
      logger.info(`Admin ${admin.id} created a new bus ${busId} with driver ${driverId}, route ${route} and bus number ${busNum}`);
      res.status(200).json({success: true});
    }
  }
};

export default handleAddBus