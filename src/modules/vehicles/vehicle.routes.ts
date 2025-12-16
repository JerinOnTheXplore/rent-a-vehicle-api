import express , { Request, Response } from "express";
import { vehicleControllers } from "./vehicle.controller";
import { verifyToken } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/role.middleware";

const router = express.Router();

router.post("/",verifyToken, authorize("admin"), vehicleControllers.createVehicle);

router.get("/",vehicleControllers.getVehicle);

router.get("/:vehicleId",vehicleControllers.getSingleVehicle);

router.put("/:vehicleId",verifyToken, authorize("admin"),vehicleControllers.updateVehicle);

router.delete("/:vehicleId",verifyToken, authorize("admin"),vehicleControllers.deleteVehicle);


export const vehicleRoutes=router;