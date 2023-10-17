export const passportConfig = {
  credentials: {
    tenantID: "ff9c7474-421d-4957-8d47-c4b64dec87b5",
    clientID: "e5724aa5-5621-4a32-8938-e1a79e579602",
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
