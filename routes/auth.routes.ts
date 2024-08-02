import express, { Application } from "express";
import authController from "../controllers/auth.controller";

export const authRouter = express.Router();

authRouter.post("/signin", authController.signIn);
