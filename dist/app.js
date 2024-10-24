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
const users_model_1 = __importDefault(require("./models/users.model"));
const reports_routes_1 = require("./routes/reports.routes");
const users_routes_1 = require("./routes/users.routes");
const xss_clean_1 = __importDefault(require("xss-clean"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const database_config_1 = __importDefault(require("./config/database.config"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const users_service_1 = __importDefault(require("./services/users.service"));
const auth_routes_1 = require("./routes/auth.routes");
const app = (0, express_1.default)();
app.use((0, xss_clean_1.default)());
app.use((0, express_mongo_sanitize_1.default)());
app.use((0, helmet_1.default)({
    frameguard: { action: "deny" },
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "trusted-scripts.com"],
        },
    },
}));
app.set("trust proxy", 1);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, morgan_1.default)("dev"));
app.use(helmet_1.default.hsts({ maxAge: 31536000, includeSubDomains: true }));
//app.use(enforce.HTTPS({ trustProtoHeader: true }));
app.use(helmet_1.default.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "trusted-scripts.com"],
        objectSrc: ["'none'"],
    },
}));
app.use(helmet_1.default.frameguard({ action: "deny" }));
app.use(helmet_1.default.referrerPolicy({ policy: "same-origin" }));
app.use((req, res, next) => {
    res.header("X-Frame-Options", "DENY");
    next();
});
app.use("/api", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var authHeader = req.headers["authorization"];
    console.log("authHeader >>>>>", authHeader);
    var token = authHeader && authHeader.split(" ")[1];
    console.log("token >>>>>", token);
    if (!token) {
        return res.json({ message: "no JWT token present" }).status(401);
    }
    try {
        const decoded = yield (0, jwt_decode_1.default)(token);
        req.user = decoded;
        const user = yield users_model_1.default.findOne({
            email: decoded.preferred_username,
        });
        console.log(user);
        if (user) {
            next();
        }
        else {
            try {
                const newUser = yield users_service_1.default.createUser({
                    name: decoded.name,
                    email: decoded.preferred_username,
                    roles: ["observable"],
                });
                next();
            }
            catch (e) {
                console.error(e);
                return res.status(400).json(e);
            }
        }
    }
    catch (error) {
        return res.json({ message: error.message }).status(401);
    }
}));
app.get("/", (req, res) => {
    return res.status(200).json({ message: `BAT API Project is running` });
});
app.use("/", auth_routes_1.authRouter);
app.use("/api", users_routes_1.usersRouter);
app.use("/api", reports_routes_1.reportRouter);
app.get("/api/me", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const me = yield users_model_1.default.findOne({
        email: req.user.preferred_username,
    });
    if (me) {
        return res.status(200).json({ me });
    }
    else {
        return res.status(404).json({ error: "user not found" });
    }
}));
const port = process.env.PORT || 5000;
(0, database_config_1.default)();
app.listen(port, () => {
    console.log("BAT POC Server started " + port);
});
module.exports = app;
//# sourceMappingURL=app.js.map