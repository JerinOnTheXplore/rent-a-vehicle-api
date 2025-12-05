import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import {Pool} from "pg";

dotenv.config({path: path.join(process.cwd(), ".env")});
const app = express();

app.use(express.json());

//DB
const pool = new Pool({
  connectionString: `${process.env.DATABASE_URL}`,
});

const initDB = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
     id SERIAL PRIMARY KEY,
     name VARCHAR(100) NOT NULL,
     email VARCHAR(100) NOT NULL UNIQUE,
     password VARCHAR(255) NOT NULL,
     phone VARCHAR(20) NOT NULL,
     role VARCHAR(20) DEFAULT 'customer' CHECK(role IN ('admin', 'customer'))
    )
    `);

    //vehicles table
    await pool.query(`
    CREATE TABLE IF NOT EXISTS vehicles (
     id SERIAL PRIMARY KEY,
     vehicle_name VARCHAR(100) NOT NULL,
     type VARCHAR(20) NOT NULL CHECK(type IN ('car', 'bike', 'van', 'SUV')),
     registration_number VARCHAR(50) NOT NULL UNIQUE,
     daily_rent_price NUMERIC(10,2) NOT NULL CHECK(daily_rent_price >0),
     availability_status VARCHAR(20) DEFAULT 'available' CHECk(availability_status IN ('available', 'booked'))  
    )   
    `);

    //bookings table
    await pool.query(`
    CREATE TABLE IF NOT EXISTS bookings (
     id SERIAL PRIMARY KEY,
     customer_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
     vehicle_id INT NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
     rent_start_date DATE NOT NULL,
     rent_end_date DATE NOT NULL,
     total_price NUMERIC(10,2) NOT NULL CHECK(total_price >0),
     status VARCHAR(20) DEFAULT 'active' CHECK(status IN ('active', 'cancelled', 'returned')),
     CHECK (rent_end_date > rent_start_date)
    )  
    `);
};

initDB();

app.get('/', (req:Request, res:Response) => {
  res.send('Welcome to Assignment 2!! - Vehicle Rental System API is running..')
});
// users crud
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

app.listen(process.env.PORT, () => {
  console.log(`Vehicle Rental System Server listening on port ${process.env.PORT}`);
})
