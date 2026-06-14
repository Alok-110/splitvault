import express from "express";
import { register } from "../controllers/auth.controller.js";
console.log("auth route file loaded")

const authRouter = express.Router();

authRouter.post("/register", register)

export default authRouter;