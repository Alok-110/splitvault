import express from "express";
import { register, login } from "../controllers/auth.controller.js";
console.log("auth route file loaded")

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);

export default authRouter;