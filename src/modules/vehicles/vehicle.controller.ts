import { Request, Response } from "express";
import { vehicleServices } from "./vehicle.service";
import { pool } from "../../config/db";
import { userServices } from "../user/user.service";

const createVehicle = async (req:Request, res:Response)=>{
    const {vehicle_name, type, registration_number, daily_rent_price, availability_status} = req.body;

    try{
    const result = await vehicleServices.createVehicle(vehicle_name, type, registration_number, daily_rent_price, availability_status);
     res.status(201).json({
        success: true,
        message: "Vehicle added succesfully",
        data: result.rows[0]
      })
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: err.message
      })
    }
};

const getVehicle = async (req:Request, res:Response)=>{
  try{
    const result = await  vehicleServices.getVehicle();

    res.status(200).json({
      success: true,
      message: "All vehicles fetched successfully",
      data: result.rows
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

const getSingleVehicle = async(req: Request, res: Response)=>{
  const {vehicleId} = req.params;

  try{
   const result = await vehicleServices.getSingleVehicle(req.params.vehicleId!);

   if (result.rows.length === 0){
    return res.status(404).json({
      success: false,
      message: "Vehicle not found"
    });
   }

   res.status(200).json({
     success: true,
     message: "Vehicle fetched successfully",
     data: result.rows[0]
   });
  } catch (err: any){
   res.status(500).json({
    success: false,
    message: err.message
   }) ;
  }
};

const updateVehicle = async(req: Request, res: Response)=>{
  const {vehicleId	} = req.params;
  const {vehicle_name, type, registration_number, daily_rent_price, availability_status} = req.body;

  try{
   const result = await vehicleServices.updateVehicle(vehicle_name, type, registration_number, daily_rent_price, availability_status,req.params.vehicleId as string);

   if (result.rows.length === 0){
    return res.status(404).json({
      success: false,
      message: "Vehicle not found"
    });
   }

   res.status(200).json({
     success: true,
     message: "Vehicle updated successfully",
     data: result.rows[0]
   });
  } catch (err: any){
   res.status(500).json({
    success: false,
    message: err.message
   }) ;
  }
};

const deleteVehicle= async(req: Request, res: Response)=>{
  try{
   const result = await vehicleServices.deleteVehicle(req.params.vehicleId!);
//user jodi na pai..
   if (result.rows.length === 0){
    return res.status(404).json({
      success: false,
      message: "Vehicle not found"
    });
   }

   res.status(200).json({
     success: true,
     message: "Vehicle deleted successfully",
     data: result.rows[0],
   });
  } catch (err: any){
   res.status(500).json({
    success: false,
    message: err.message
   }) ;
  }
};

export const vehicleControllers = {
    createVehicle,
    getVehicle,
    getSingleVehicle,
    updateVehicle,
    deleteVehicle
}