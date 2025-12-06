import express , { Request, Response } from "express";
import { vehicleControllers } from "./vehicle.controller";

const router = express.Router();

router.post("/", vehicleControllers.createVehicle);

router.get("/",vehicleControllers.getVehicle);

router.get("/:vehicleId",vehicleControllers.getSingleVehicle);

router.put("/:vehicleId",vehicleControllers.updateVehicle);

router.delete("/:vehicleId",vehicleControllers.deleteVehicle);


export const vehicleRoutes=router;