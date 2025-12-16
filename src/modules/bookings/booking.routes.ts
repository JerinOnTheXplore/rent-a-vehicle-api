import express , { Request, Response }  from "express";
import { bookingControllers } from "./booking.controller";
import { verifyToken } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/role.middleware";

const router = express.Router();

router.post("/",verifyToken, authorize("admin", "customer"),bookingControllers.createBooking);

router.get("/",bookingControllers.getBooking);

router.get("/:bookingId",bookingControllers.getSingleBooking);

router.put("/:bookingId",bookingControllers.updateBooking);

router.delete("/:bookingId",bookingControllers.deleteBooking);


export const bookingRoutes = router;