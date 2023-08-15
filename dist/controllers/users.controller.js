"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_model_1 = __importDefault(require("../models/users.model"));
const users_service_1 = __importDefault(require("../services/users.service"));
class UsersController {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = yield users_service_1.default.getAllUsers();
                return res.status(200).json(request);
            }
            catch (e) {
                console.error(e);
                return res.status(404).json({ message: "Was not possible to get users" });
            }
        });
    }
    getUserByEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userEmail = req.params.email;
            if (!userEmail)
                throw Error('Argument email not found');
            try {
                const request = yield users_service_1.default.getUserByEmail(userEmail);
                return res.status(200).json(request);
            }
            catch (e) {
                console.error(e);
                return res.status(404).json(e);
            }
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = req.body.userData;
            const alreadExistentUser = yield users_model_1.default.findOne({
                email: newUser.email,
            });
            if (alreadExistentUser)
                return res.status(400).json('user already exists');
            try {
                yield users_service_1.default.createUser(req.body.userData);
                return res.status(201).json();
            }
            catch (e) {
                console.error(e);
                return res.status(404).json(e);
            }
        });
    }
    deleteUserByEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userEmail = req.params.email;
            if (!userEmail)
                throw Error('Argument email not found');
            try {
                yield users_service_1.default.deleteUser(userEmail);
                return res.status(201).json();
            }
            catch (e) {
                console.error(e);
                return res.status(404).json(e);
            }
        });
    }
    addUserWatchedVideo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userEmail = req.params.email;
            const video = req.body.video;
            if (!userEmail)
                throw Error('Argument email not found');
            if (!video)
                throw Error('Argument video not found');
            try {
                const request = yield users_service_1.default.addUserWatchedVideo(userEmail, video);
                return res.status(200).json(request);
            }
            catch (e) {
                console.error(e);
                return res.status(404).json(e);
            }
        });
    }
}
exports.default = new UsersController();
//# sourceMappingURL=users.controller.js.map