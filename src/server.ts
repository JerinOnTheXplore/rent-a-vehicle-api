import express, { Request, Response } from "express";
import {Pool} from "pg";
const app = express();
const port = 5000;



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

app.listen(port, () => {
  console.log(`Vehicle Rental System Server listening on port ${port}`)
})
