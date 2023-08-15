"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = exports.UsersRoutes = void 0;
const express_1 = __importDefault(require("express"));
const common_routes_config_1 = require("../common/common.routes.config");
const users_controller_1 = __importDefault(require("../controllers/users.controller"));
class UsersRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, "UserRoutes");
    }
    configureRoutes() {
        this.app
            .route("/users")
            .get(users_controller_1.default.getAll)
            .post(users_controller_1.default.createUser);
        this.app
            .route("/users/:email/videos")
            .patch(users_controller_1.default.addUserWatchedVideo);
        this.app
            .route("/users/:email")
            .get(users_controller_1.default.getUserByEmail)
            .delete(users_controller_1.default.deleteUserByEmail);
        //     .put(usersController.updateUserById)
        // this.app
        //     .route("/users")
        //     .post(usersController.createUser)
        return this.app;
    }
}
exports.UsersRoutes = UsersRoutes;
exports.usersRouter = express_1.default.Router();
exports.usersRouter.get("/users/", users_controller_1.default.getAll);
exports.usersRouter.post("/users/", users_controller_1.default.createUser);
exports.usersRouter.patch("/users/:email/videos", users_controller_1.default.addUserWatchedVideo);
exports.usersRouter.get("/users/:email", users_controller_1.default.getUserByEmail);
exports.usersRouter.delete("/users/:email", users_controller_1.default.deleteUserByEmail);
//# sourceMappingURL=users.routes.js.map