import { Router } from "express";
import { authControllers } from "./auth.controller";

const router = Router();

// http://localhost:5000/api/v1/auth/signup
// http://localhost:5000/api/v1/auth/signin
router.post("/signup",authControllers.signup);
router.post("/signin",authControllers.signin);



export const authRoutes = router;