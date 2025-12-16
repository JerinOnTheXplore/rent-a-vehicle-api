import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { authServices } from "./auth.service";

const signup = async (req: Request, res: Response)=>{
    const { name, email, password, phone, role } = req.body;

    try{
        const existingUser = await authServices.findUserByEmail(email);

        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "Email already exists",
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await authServices.createUser(
           name,
      email.toLowerCase(),
      hashedPassword,
      phone,
      role 
    );
      res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
    } catch (err: any){
          res.status(500).json({
          success: false,
          message: err.message,  
        });
    }
};

const signin = async (req: Request, res: Response)=>{
    const {email,password} = req.body;
    try{
        const user = await authServices.findUserByEmail(email.toLowerCase());
        if(!user){
            return res.status(401).json({
               success: false,
               message: "Invalid email or password",
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }
        //ekhane JWT create kortesi
        const token = jwt.sign(
            {
            id: user.id,
            role: user.role,
            email: user.email,
            },
           process.env.JWT_SECRET as string,
           { expiresIn: "7d" }  
        );
        console.log(token)
        res.status(200).json({
           success: true,
           message: "Login successful",
           data:{
            token,
            user:{
              id:user.id,
              name: user.name,
              email: user.email,
              phone: user.phone,
              role: user.role,
            },
           },
        });
    } catch (err: any){
        res.status(500).json({
           success: false,
           message: err.message, 
        });
    }
};

export const authControllers = {
    signup,
    signin
}