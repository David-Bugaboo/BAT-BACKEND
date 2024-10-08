import usersModel from "./models/users.model";
import { reportRouter } from "./routes/reports.routes";
import { usersRouter } from "./routes/users.routes";
import xss from "xss-clean";
import express, { NextFunction, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import connectMongo from "./config/database.config";
import ExpressMongoSanitize from "express-mongo-sanitize";
import jwtDecode from "jwt-decode";
import usersService from "./services/users.service";
import enforce from "express-sslify";
import { authRouter } from "./routes/auth.routes";

const app = express();
app.use(xss());
app.use(ExpressMongoSanitize());
app.use(
  helmet({
    frameguard: { action: "deny" },
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "trusted-scripts.com"],
      },
    },
  })
);
app.set("trust proxy", 1);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(helmet.hsts({ maxAge: 31536000, includeSubDomains: true }));
//app.use(enforce.HTTPS({ trustProtoHeader: true }));
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "trusted-scripts.com"],
      objectSrc: ["'none'"],
    },
  })
);
app.use(helmet.frameguard({ action: "deny" }));
app.use(helmet.referrerPolicy({ policy: "same-origin" }));

app.use((req, res, next) => {
  res.header("X-Frame-Options", "DENY");
  next();
});
app.use("/api", async (req: any, res: Response, next: NextFunction) => {
  var authHeader = req.headers["authorization"];

  console.log("authHeader >>>>>", authHeader);

  var token = authHeader && authHeader.split(" ")[1];

  console.log("token >>>>>", token);

  if (!token) {
    return res.json({ message: "no JWT token present" }).status(401);
  }

  try {
    const decoded: any = await jwtDecode(token);
    req.user = decoded;

    const user = await usersModel.findOne({
      email: decoded.preferred_username,
    });
    console.log(user);
    if (user) {
      next();
    } else {
      try {
        const newUser = await usersService.createUser({
          name: decoded.name,
          email: decoded.preferred_username,
          roles: ["observable"],
        });
        next();
      } catch (e: any) {
        console.error(e);
        return res.status(400).json(e);
      }
    }
  } catch (error) {
    return res.json({ message: error.message }).status(401);
  }
});
app.get("/", (req, res) => {
  return res.status(200).json({ message: `BAT API Project is running` });
});
app.use("/", authRouter);
app.use("/api", usersRouter);
app.use("/api", reportRouter);
app.get("/api/me", async (req: any, res: any) => {
  const me = await usersModel.findOne({
    email: req.user.preferred_username,
  });
  if (me) {
    return res.status(200).json({ me });
  } else {
    return res.status(404).json({ error: "user not found" });
  }
});
const port = process.env.PORT || 5000;
connectMongo();
app.listen(port, () => {
  console.log("BAT POC Server started " + port);
});
module.exports = app;
