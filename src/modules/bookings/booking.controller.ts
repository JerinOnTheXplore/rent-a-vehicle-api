import { Request, Response } from "express";
import { pool } from "../../config/db";
import { bookingServices } from "./booking.service";

const createBooking = async (req:Request, res:Response)=>{
    const {customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status} = req.body;

    try{
    const result = await bookingServices.createBooking(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status);
    const vehicleResult = await pool.query(
  `SELECT vehicle_name, daily_rent_price FROM vehicles WHERE id = $1`,
  [vehicle_id]
);
     res.status(201).json({
        success: true,
        message: "Booking created succesfully",
         data: {
    ...result.rows[0],
    vehicle: vehicleResult.rows[0]
    }
      });
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: err.message
      })
    }
};

const getBooking = async (req:Request, res:Response)=>{
  try{
    const result = await  bookingServices.getBooking();
    const bookings = result.rows;
    const data =[];
    for (const b of bookings){
      const customerResult = await pool.query(
        `SELECT name, email FROM users WHERE id = $1`,[b.customer_id]
      );
      const vehicleResult = await pool.query(
        `SELECT vehicle_name, registration_number FROM vehicles WHERE id = $1`,[b.vehicle_id]
      );
      data.push({
      ...b,
      customer: customerResult.rows[0],
      vehicle: vehicleResult.rows[0]
    })
    };

    res.status(200).json({
      success: true,
      message: "Your bookings retrieved successfully",
      data
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

const getSingleBooking = async(req: Request, res: Response)=>{

  try{
   const result = await bookingServices.getSingleBooking(req.params.bookingId!);

   if (result.rows.length === 0){
    return res.status(404).json({
      success: false,
      message: "Booking not found"
    });
   }
  const booking = result.rows[0];
  const customerResult = await pool.query(
    `SELECT name, email FROM users WHERE id=$1`,[booking.customer_id]
  );
  const vehicleResult = await pool.query(
    `SELECT vehicle_name, registration_number FROM vehicles WHERE id = $1`,[booking.vehicle_id]
  );
   res.status(200).json({
     success: true,
     message: "Booking fetched successfully",
     data: {
      ...booking,
      customer:customerResult.rows[0],
      vehicle: vehicleResult.rows[0]
     }
   });
  } catch (err: any){
   res.status(500).json({
    success: false,
    message: err.message
   }) ;
  }
};

const updateBooking = async(req: Request, res: Response)=>{
  const {bookingId} = req.params;
  const {customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status} = req.body;

  try{
   const result = await bookingServices.updateBooking(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status,bookingId!);

   if (result.rows.length === 0){
    return res.status(404).json({
      success: false,
      message: "Booking not found"
    });
   }

   res.status(200).json({
     success: true,
     message: "Booking updated successfully",
     data: result.rows[0]
   });
  } catch (err: any){
   res.status(500).json({
    success: false,
    message: err.message
   }) ;
  }
};

const deleteBooking = async(req: Request, res: Response)=>{
  try{
   const result = await bookingServices.deleteBooking(req.params.bookingId as string);
//user jodi na pai..
   if (result.rows.length === 0){
    return res.status(404).json({
      success: false,
      message: "Booking not found"
    });
   }

   res.status(200).json({
     success: true,
     message: "Booking deleted successfully",
     data: result.rows[0],
   });
  } catch (err: any){
   res.status(500).json({
    success: false,
    message: err.message
   }) ;
  }
}

export const bookingControllers = {
    createBooking,
    getBooking,
    getSingleBooking,
    updateBooking,
    deleteBooking
}