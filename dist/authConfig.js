"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passportConfig = void 0;
exports.passportConfig = {
    credentials: {
        tenantID: "d46a1643-0a4e-486c-bc19-100766010a15",
        clientID: "c1a254d6-bb21-4b68-aded-186d9fec6fcc",
    },
    metadata: {
        authority: "login.microsoftonline.com",
        discovery: ".well-known/openid-configuration",
        version: "v2.0",
    },
    settings: {
        validateIssuer: true,
        passReqToCallback: true,
        loggingLevel: "info",
        loggingNoPII: true,
    },
    protectedRoutes: {
        todolist: {
            endpoint: "/api/todolist",
            delegatedPermissions: {
                read: ["Todolist.Read", "Todolist.ReadWrite"],
                write: ["Todolist.ReadWrite"],
            },
            applicationPermissions: {
                read: ["Todolist.Read.All", "Todolist.ReadWrite.All"],
                write: ["Todolist.ReadWrite.All"],
            },
        },
    },
};
exports.default = exports.passportConfig;
//# sourceMappingURL=authConfig.js.map