import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";


export const verifyToken = (
    req: Request & {user?:any},
    res: Response,
    next: NextFunction
) =>{
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({
            success: false,
            message: "Unauthorized access",
        });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token missing",
    });
  }
    try{
        const decoded = jwt.verify(
            token,
            config.jwt_secret as string
        );
        req.user=decoded;
        next();
    } catch {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};