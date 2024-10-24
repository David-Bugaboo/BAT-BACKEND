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
const axios_1 = __importDefault(require("axios"));
const analyticsFactory_factory_1 = __importDefault(require("../factory/analyticsFactory.factory"));
class UsersService {
    getUserByEmail(userEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield users_model_1.default.findOne({
                email: userEmail,
            });
            if (!user) {
                throw { code: "001", message: "User not found" };
            }
            delete user.password;
            return user;
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield users_model_1.default.find();
            for (const user of users) {
                user.password = undefined;
            }
            return users;
        });
    }
    generatePassword() {
        return Math.random().toString(36).substring(2, 7);
    }
    sendUserEmail(userEmail, pass) {
        const body = {
            from: {
                email: process.env.MAIL_SENDER_EMAIL || "bat@bugaboostudio.app",
            },
            personalizations: [
                {
                    to: [
                        {
                            email: userEmail,
                        },
                    ],
                    dynamic_template_data: {
                        user_email: userEmail,
                        user_pass: pass,
                    },
                },
            ],
            template_id: "d-3c859e6cb7c841319eba2b92d904675e",
        };
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
        };
        axios_1.default
            .post("https://api.sendgrid.com/v3/mail/send", body, {
            headers: headers,
        })
            .then(() => {
            console.log(`Email sent to ${userEmail}`);
        })
            .catch((err) => {
            console.error(err);
        });
    }
    createUser(newUserData) {
        return __awaiter(this, void 0, void 0, function* () {
            const pass = this.generatePassword();
            const newUserSanitized = {
                name: newUserData.name,
                email: newUserData.email,
                password: yield hash(pass, salt),
                roles: newUserData.roles,
                recoveryPassCode: "",
                signInQuantity: 0,
                watchedVideos: [],
                userAnalytics: analyticsFactory_factory_1.default.createEmptyAnalytics(),
            };
            const newUser = new users_model_1.default(newUserSanitized);
            yield newUser.save();
            this.sendUserEmail(newUserData.email, pass);
            return newUser;
        });
    }
    deleteUser(userEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield users_model_1.default.findOne({
                email: userEmail,
            });
            if (!user) {
                throw { code: "001", message: "User not found" };
            }
            users_model_1.default.deleteOne({ email: userEmail });
            user.deleteOne();
        });
    }
    addUserWatchedVideo(userEmail, newVideo) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield users_model_1.default.findOne({
                email: userEmail,
            });
            if (!user) {
                throw { code: "001", message: "User not found" };
            }
            if (user.watchedVideos.find((video) => video === newVideo)) {
                throw {
                    code: "002",
                    message: `User ${userEmail} already watched video ${newVideo}`,
                };
            }
            user.watchedVideos.push(newVideo);
            user.save();
        });
    }
    registerUserAnalytics(userEmail, analytics) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield users_model_1.default.findOne({
                email: userEmail,
            });
            if (!user) {
                throw { code: "001", message: "User not found" };
            }
            const newAnalytics = analyticsFactory_factory_1.default.compareAnalytics(user.userAnalytics, analytics);
            user.userAnalytics = newAnalytics;
            yield user.save();
        });
    }
}
exports.default = new UsersService();
//# sourceMappingURL=users.service.js.map