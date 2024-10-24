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
const auth_service_1 = __importDefault(require("../services/auth.service"));
class AuthController {
    signIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: check if has email and password on payload    
            const email = req.body.email;
            const password = req.body.password;
            if (!email || !password) {
                return res.status(400).json({
                    message: "Email and password are required"
                });
            }
            try {
                const response = yield auth_service_1.default.signIn(email, password);
                return res.status(200).send(response);
            }
            catch (err) {
                console.error(err);
                res.status(400).send(`Was not possible to sig in this user`);
            }
        });
    }
}
exports.default = new AuthController();
//# sourceMappingURL=auth.controller.js.map