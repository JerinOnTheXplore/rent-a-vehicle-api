import express, { Request, Response } from "express"
const app = express()
const port = 5000

app.get('/', (req:Request, res:Response) => {
  res.send('Welcome to Assignment 2!! - Vehicle Rental System API is running..')
})

app.listen(port, () => {
  console.log(`Vehicle Rental System Server listening on port ${port}`)
})
