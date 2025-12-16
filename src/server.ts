import express, { NextFunction, Request, Response } from "express";
import {Pool} from "pg";
import config from "./config";
import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import { userRoutes } from "./modules/user/user.routes";
import { vehicleRoutes } from "./modules/vehicles/vehicle.routes";
import { bookingRoutes } from "./modules/bookings/booking.routes";
import { authRoutes } from "./modules/auth/auth.route";
const app = express();
const port = config.port;

app.use(express.json());

//initializing DB
initDB();

app.get('/',logger, (req:Request, res:Response) => {
  res.send('Welcome to Assignment 2!! - Vehicle Rental System API is running..')
});
// users crud
app.use("/api/v1/users",userRoutes);
//vehicles CRUD
app.use("/api/v1/vehicles",vehicleRoutes);
//bookings crud
app.use("/api/v1/bookings",bookingRoutes);

//auth route
app.use("/auth", authRoutes);

app.use((req,res)=>{
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.path,
  });
});

app.listen(port, () => {
  console.log(`Vehicle Rental System Server listening on port ${port}`);
})
