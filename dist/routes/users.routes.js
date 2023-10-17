"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = __importDefault(require("express"));
const users_controller_1 = __importDefault(require("../controllers/users.controller"));
exports.usersRouter = express_1.default.Router();
exports.usersRouter.get("/users/", users_controller_1.default.getAll);
exports.usersRouter.post("/users/", users_controller_1.default.createUser);
exports.usersRouter.patch("/users/:email/videos", users_controller_1.default.addUserWatchedVideo);
exports.usersRouter.get("/users/:email", users_controller_1.default.getUserByEmail);
exports.usersRouter.delete("/users/:email", users_controller_1.default.deleteUserByEmail);
//# sourceMappingURL=users.routes.js.map