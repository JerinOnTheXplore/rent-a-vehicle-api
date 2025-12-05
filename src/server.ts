import express, { Request, Response } from "express";
import dotenv from "dotenv"
import {Pool} from "pg";

dotenv.config();
const app = express();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.use(express.json());

app.get('/', (req:Request, res:Response) => {
  res.send('Welcome to Assignment 2!! - Vehicle Rental System API is running..')
});

app.post("/",(req:Request, res:Response)=>{
    console.log(req.body);

    res.status(201).json({
        success:true,
        message: "API is working",
    });
});

app.listen(process.env.PORT, () => {
  console.log(`Vehicle Rental System Server listening on port ${process.env.PORT}`);
})
