import express, { Application } from "express";
import { CommonRoutesConfig } from "../common/common.routes.config"
import usersController from "../controllers/users.controller";

export class UsersRoutes extends CommonRoutesConfig {
    constructor(app: Application) {
        super(app, "UserRoutes");
    }

    configureRoutes(): Application {
        this.app
            .route("/users")
            .get(usersController.getAll)
            .post(usersController.createUser)

        this.app
            .route("/users/:email/videos")
            .patch(usersController.addUserWatchedVideo)

        this.app
            .route("/users/:email")
            .get(usersController.getUserByEmail)
            .delete(usersController.deleteUserByEmail)
        //     .put(usersController.updateUserById)

        // this.app
        //     .route("/users")
        //     .post(usersController.createUser)

        return this.app;
    }
}

export const usersRouter = express.Router()

usersRouter.get("/users/",usersController.getAll)
usersRouter.post("/users/",usersController.createUser)
usersRouter.patch("/users/:email/videos",usersController.addUserWatchedVideo)
usersRouter.get("/users/:email",usersController.getUserByEmail)
usersRouter.delete("/users/:email",usersController.deleteUserByEmail)