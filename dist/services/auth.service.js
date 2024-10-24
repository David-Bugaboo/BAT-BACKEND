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
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const users_model_1 = __importDefault(require("../models/users.model"));
class AuthService {
    signIn(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield users_model_1.default.findOne({
                email,
            });
            if (!user || !user.password)
                throw new Error("Unable to login");
            const passwordIsValid = (0, bcrypt_1.compareSync)(password, user.password);
            if (!passwordIsValid)
                throw new Error("Could not login");
            user.signInQuantity = user.signInQuantity + 1;
            yield user.save();
            const sanitizedUser = {
                name: user.name,
                email: user.email,
                roles: user.roles,
                signInQuantity: user.signInQuantity,
                watchedVideos: user.watchedVideos,
                userAnalytics: user.userAnalytics,
            };
            const token = (0, jsonwebtoken_1.sign)({ preferred_username: user.email }, process.env.JWT_KEY || "thisismyjwtkey", {
                expiresIn: process.env.JWT_EXPIRE_TIME || 3600,
            });
            return {
                userData: sanitizedUser,
                token: token,
            };
        });
    }
}
exports.default = new AuthService();
//# sourceMappingURL=auth.service.js.map