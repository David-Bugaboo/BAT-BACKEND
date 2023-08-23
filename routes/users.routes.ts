import express, { Application } from "express";
import { CommonRoutesConfig } from "../common/common.routes.config"
import usersController from "../controllers/users.controller";


export const usersRouter = express.Router()

usersRouter.get("/users/",usersController.getAll)
usersRouter.post("/users/",usersController.createUser)
usersRouter.patch("/users/:email/videos",usersController.addUserWatchedVideo)
usersRouter.get("/users/:email",usersController.getUserByEmail)
usersRouter.delete("/users/:email",usersController.deleteUserByEmail)