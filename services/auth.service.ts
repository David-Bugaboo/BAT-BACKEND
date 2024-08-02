import { compareSync } from "bcrypt";

import { sign } from "jsonwebtoken";
import { IUser } from "../interface/users.interface";
import usersModel from "../models/users.model";

class AuthService {
  async signIn(
    email: string,
    password: string
  ): Promise<{ userData: IUser; token: string }> {
    const user = await usersModel.findOne({
      email,
    });

    if (!user || !user.password) throw new Error("Unable to login");

    const passwordIsValid = compareSync(password, user.password!);
    if (!passwordIsValid) throw new Error("Could not login");

    user.signInQuantity = user.signInQuantity + 1;
    await user.save();

    const sanitizedUser: IUser = {
      name: user.name,
      email: user.email,
      roles: user.roles,
      signInQuantity: user.signInQuantity,
      watchedVideos: user.watchedVideos,
      userAnalytics: user.userAnalytics,
    };

    const token: string = sign(
      { preferred_username: user.email },
      process.env.JWT_KEY || "thisismyjwtkey",
      {
        expiresIn: process.env.JWT_EXPIRE_TIME || 3600,
      }
    );

    return {
      userData: sanitizedUser,
      token: token,
    };
  }
}

export default new AuthService();
