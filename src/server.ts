import express, { NextFunction, Request, Response } from "express";
import {Pool} from "pg";
import config from "./config";
import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
const app = express();
const port = config.port;

app.use(express.json());

//initializing DB
initDB();

app.get('/',logger, (req:Request, res:Response) => {
  res.send('Welcome to Assignment 2!! - Vehicle Rental System API is running..')
});
// users crud
// post
app.post("/api/v1/users", async (req:Request, res:Response)=>{
    const {name, email, password, phone,role} = req.body;

    try{
    const result = await pool.query(`INSERT INTO users(name, email, password, phone,role) VALUES($1, $2, $3, $4, $5) RETURNING *`,[name, email, password, phone,role]);
     res.status(201).json({
        success: true,
        message: "Data Inserted succesfully",
        data: result.rows[0]
      })
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: err.message
      })
    }
});

//get
app.get("/api/v1/users", async (req:Request, res:Response)=>{
  try{
    const result = await  pool.query(`SELECT * FROM users`);

    res.status(200).json({
      success: true,
      message: "All users fetched successfully",
      data: result.rows
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

//get single user by id
app.get("/api/v1/users/:userId", async(req: Request, res: Response)=>{
  const {userId} = req.params;

  try{
   const result = await pool.query(`SELECT * FROM users WHERE id = $1`,[userId]);

   if (result.rows.length === 0){
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
   }

   res.status(200).json({
     success: true,
     message: "User fetched successfully",
     data: result.rows[0]
   });
  } catch (err: any){
   res.status(500).json({
    success: false,
    message: err.message
   }) ;
  }
});

//update
app.put("/api/v1/users/:userId", async(req: Request, res: Response)=>{
  const {userId} = req.params;
  const {name, email, password, phone, role} = req.body;

  try{
   const result = await pool.query(`UPDATE users SET name = $1, email = $2, password = $3, phone = $4, role = $5 WHERE id = $6 RETURNING *`,[name,email,password,phone,role,userId]
   );

   if (result.rows.length === 0){
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
   }

   res.status(200).json({
     success: true,
     message: "User updated successfully",
     data: result.rows[0]
   });
  } catch (err: any){
   res.status(500).json({
    success: false,
    message: err.message
   }) ;
  }
});

//delete
app.delete("/api/v1/users/:userId", async(req: Request, res: Response)=>{
  const {userId} = req.params;

  try{
   const result = await pool.query(`DELETE FROM users WHERE id = $1 RETURNING *`,[userId]);
//user jodi na pai..
   if (result.rows.length === 0){
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
   }

   res.status(200).json({
     success: true,
     message: "User deleted successfully",
     data: result.rows[0],
   });
  } catch (err: any){
   res.status(500).json({
    success: false,
    message: err.message
   }) ;
  }
});

//vehicles CRUD
//POST
app.post("/api/v1/vehicles", async (req:Request, res:Response)=>{
    const {vehicle_name, type, registration_number, daily_rent_price, availability_status} = req.body;

    try{
    const result = await pool.query(`INSERT INTO vehicles(vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES($1, $2, $3, $4, $5) RETURNING *`,[vehicle_name, type, registration_number, daily_rent_price, availability_status]);
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
});

//GET
app.get("/api/v1/vehicles", async (req:Request, res:Response)=>{
  try{
    const result = await  pool.query(`SELECT * FROM vehicles`);

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
});

//get single vehicle
app.get("/api/v1/vehicles/:vehicleId", async(req: Request, res: Response)=>{
  const {vehicleId} = req.params;

  try{
   const result = await pool.query(`SELECT * FROM vehicles WHERE id = $1`,[vehicleId]);

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
});

//update vehicle
app.put("/api/v1/vehicles/:vehicleId", async(req: Request, res: Response)=>{
  const {vehicleId	} = req.params;
  const {vehicle_name, type, registration_number, daily_rent_price, availability_status} = req.body;

  try{
   const result = await pool.query(`UPDATE vehicles SET vehicle_name = $1, type = $2, registration_number = $3, daily_rent_price = $4, availability_status = $5 WHERE id = $6 RETURNING *`,[vehicle_name, type, registration_number, daily_rent_price, availability_status,vehicleId]
   );

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
});

//delete
app.delete("/api/v1/vehicles/:vehicleId", async(req: Request, res: Response)=>{
  const {vehicleId	} = req.params;

  try{
   const result = await pool.query(`DELETE FROM vehicles WHERE id = $1 RETURNING *`,[vehicleId]);
//user jodi na pai..
   if (result.rows.length === 0){
    return res.status(404).json({
      success: false,
      message: "Vehicle not found"
    });
   }

   res.status(200).json({
     success: true,
     message: "Vehicles deleted successfully",
     data: result.rows[0],
   });
  } catch (err: any){
   res.status(500).json({
    success: false,
    message: err.message
   }) ;
  }
});

//bookings crud
//POST
app.post("/api/v1/bookings", async (req:Request, res:Response)=>{
    const {customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status} = req.body;

    try{
    const result = await pool.query(`INSERT INTO bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,[customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status]);
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
});

//get
app.get("/api/v1/bookings", async (req:Request, res:Response)=>{
  try{
    const result = await  pool.query(`SELECT * FROM bookings ORDER BY id`);
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
      message: "All bookings retrieved successfully",
      data
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

//get single booking
app.get("/api/v1/bookings/:bookingId", async(req: Request, res: Response)=>{
  const {bookingId} = req.params;

  try{
   const result = await pool.query(`SELECT * FROM bookings WHERE id = $1`,[bookingId]);

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
});

//PUt
app.put("/api/v1/bookings/:bookingId", async(req: Request, res: Response)=>{
  const {bookingId} = req.params;
  const {customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status} = req.body;

  try{
   const result = await pool.query(`UPDATE bookings SET customer_id=$1, vehicle_id=$2, rent_start_date=$3, rent_end_date=$4, total_price=$5, status=$6
   WHERE id=$7 RETURNING *`,[customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status,bookingId]
   );

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
});

app.delete("/api/v1/bookings/:bookingId", async(req: Request, res: Response)=>{
  const {bookingId} = req.params;

  try{
   const result = await pool.query(`DELETE FROM bookings WHERE id = $1 RETURNING *`,[bookingId]);
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
});

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
