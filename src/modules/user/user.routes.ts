import express, { Request, Response } from "express";
import { userControllers } from "./user.controller";
import { verifyToken } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/role.middleware";

const router = express.Router();

router.post("/", userControllers.createUser);

router.get("/",verifyToken, authorize("admin"),userControllers.getUser);

router.get("/:userId",verifyToken, authorize("admin"),userControllers.getSingleUser);

router.put("/:userId",verifyToken, authorize("admin", "customer"),userControllers.updateUser);

router.delete("/:userId",verifyToken, authorize("admin"),userControllers.deleteUser);

export const userRoutes=router;