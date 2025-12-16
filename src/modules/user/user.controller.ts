import { Request, Response } from "express";
import { pool } from "../../config/db";
import { userServices } from "./user.service";

const createUser = async (req:Request, res:Response)=>{
    const {name, email, password, phone,role} = req.body;

    try{
    const result =await userServices.createUser(name, email, password, phone,role);
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
};

const getUser = async (req:Request, res:Response)=>{
  try{
    const result = await userServices.getUser();

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: result.rows
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

const getSingleUser = async(req: Request, res: Response)=>{

  try{
   const result = await userServices.getSingleUser(req.params.userId as string);

   if (result.rows.length === 0){
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
   }

   res.status(200).json({
     success: true,
     message: "User retrieved successfully",
     data: result.rows[0]
   });
  } catch (err: any){
   res.status(500).json({
    success: false,
    message: err.message
   }) ;
  }
};

const updateUser = async(req: Request, res: Response)=>{
  const {name, email, password, phone, role} = req.body;

  try{
   const result = await userServices.updateUser(name,email,password,phone,role,req.params.userId as string);

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
};

const deleteUser = async(req: Request, res: Response)=>{

  try{
   const result = await userServices.deleteUser(req.params.userId!);
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
}

export const userControllers = {
    createUser,
    getUser,
    getSingleUser,
    updateUser,
    deleteUser
}