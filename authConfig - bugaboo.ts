export const passportConfig = {
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
        read: ["BAT.Read"],
      },
      applicationPermissions: {
        read: ["BAT.Read.All"],
      },
    },
  },
};

export default passportConfig;
