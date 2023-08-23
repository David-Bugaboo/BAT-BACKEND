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
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const passport_1 = __importDefault(require("passport"));
const passport_azure_ad_1 = __importDefault(require("passport-azure-ad"));
const database_config_1 = __importDefault(require("./config/database.config"));
const authConfig_1 = __importDefault(require("./authConfig"));
const users_service_1 = __importDefault(require("./services/users.service"));
const app = (0, express_1.default)();
/**
 * If your app is behind a proxy, reverse proxy or a load balancer, consider
 * letting express know that you are behind that proxy. To do so, uncomment
 * the line below.
 */
// app.set('trust proxy',  /* numberOfProxies */);
/**
 * HTTP request handlers should not perform expensive operations such as accessing the file system,
 * executing an operating system command or interacting with a database without limiting the rate at
 * which requests are accepted. Otherwise, the application becomes vulnerable to denial-of-service attacks
 * where an attacker can cause the application to crash or become unresponsive by issuing a large number of
 * requests at the same time. For more information, visit: https://cheatsheetseries.owasp.org/cheatsheets/Denial_of_Service_Cheat_Sheet.html
 */
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
// Apply the rate limiting middleware to all requests
app.use(limiter);
app.set("trust proxy", 1);
/**
 * Enable CORS middleware. In production, modify as to allow only designated origins and methods.
 * If you are using Azure App Service, we recommend removing the line below and configure CORS on the App Service itself.
 */
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, morgan_1.default)("dev"));
const bearerStrategy = new passport_azure_ad_1.default.BearerStrategy({
    identityMetadata: `https://${authConfig_1.default.metadata.authority}/${authConfig_1.default.credentials.tenantID}/${authConfig_1.default.metadata.version}/${authConfig_1.default.metadata.discovery}`,
    issuer: `https://${authConfig_1.default.metadata.authority}/${authConfig_1.default.credentials.tenantID}/${authConfig_1.default.metadata.version}`,
    clientID: authConfig_1.default.credentials.clientID,
    audience: authConfig_1.default.credentials.clientID,
    validateIssuer: authConfig_1.default.settings.validateIssuer,
    passReqToCallback: authConfig_1.default.settings.passReqToCallback,
    loggingLevel: authConfig_1.default.settings.loggingLevel,
    loggingNoPII: authConfig_1.default.settings.loggingNoPII,
}, (req, token, done) => {
    /**
     * Below you can do extended token validation and check for additional claims, such as:
     * - check if the caller's tenant is in the allowed tenants list via the 'tid' claim (for multi-tenant applications)
     * - check if the caller's account is homed or guest via the 'acct' optional claim
     * - check if the caller belongs to right roles or groups via the 'roles' or 'groups' claim, respectively
     *
     * Bear in mind that you can do any of the above checks within the individual routes and/or controllers as well.
     * For more information, visit: https://docs.microsoft.com/azure/active-directory/develop/access-tokens#validate-the-user-has-permission-to-access-this-data
     */
    /**
     * Lines below verifies if the caller's client ID is in the list of allowed clients.
     * This ensures only the applications with the right client ID can access this API.
     * To do so, we use "azp" claim in the access token. Uncomment the lines below to enable this check.
     */
    // const myAllowedClientsList = [
    //     /* add here the client IDs of the applications that are allowed to call this API */
    // ]
    // if (!myAllowedClientsList.includes(token.azp)) {
    //     return done(new Error('Unauthorized'), {}, "Client not allowed");
    // }
    /**
     * Access tokens that have neither the 'scp' (for delegated permissions) nor
     * 'roles' (for application permissions) claim are not to be honored.
     */
    if (!token.hasOwnProperty("scp") && !token.hasOwnProperty("roles")) {
        return done(new Error("Unauthorized"), null, "No delegated or app permission claims found");
    }
    /**
     * If needed, pass down additional user info to route using the second argument below.
     * This information will be available in the req.user object.
     */
    return done(null, {}, token);
});
app.use(passport_1.default.initialize());
passport_1.default.use(bearerStrategy);
app.use("/api", (req, res, next) => {
    passport_1.default.authenticate("oauth-bearer", {
        session: false,
        /**
         * If you are building a multi-tenant application and you need supply the tenant ID or name dynamically,
         * uncomment the line below and pass in the tenant information. For more information, see:
         * https://github.com/AzureAD/passport-azure-ad#423-options-available-for-passportauthenticate
         */
        // tenantIdOrName: <some-tenant-id-or-name>
    }, (err, user, info) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            /**
             * An error occurred during authorization. Either pass the error to the next function
             * for Express error handler to handle, or send a response with the appropriate status code.
             */
            return res.status(401).json({ error: err.message });
        }
        if (!user) {
            // If no user object found, send a 401 response.
            return res.status(401).json({ error: "Unauthorized" });
        }
        if (info) {
            // access token payload will be available in req.authInfo downstream
            req.authInfo = info;
        }
        user = yield users_model_1.default.findOne({ email: info.preferred_username });
        console.log(user);
        if (user) {
            req.user = user;
            next();
        }
        else {
            try {
                const newUser = yield users_service_1.default.createUser({
                    name: info.name,
                    email: info.preferred_username,
                    roles: ["observable"],
                });
                req.user = newUser;
                next();
            }
            catch (e) {
                console.error(e);
                return res.status(400).json(e);
            }
        }
    }))(req, res, next);
});
app.get("/", (req, res) => {
    return res.status(200).json({ message: `BAT API Project is running` });
});
app.use("/api", users_routes_1.usersRouter);
app.use("/api", reports_routes_1.reportRouter);
app.get("/api/me", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("passou aqui");
    console.log(req.authInfo);
    const me = yield users_model_1.default.findOne({
        email: req.authInfo.preferred_username,
    });
    console.log(me);
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