import { IUser } from "../interface/users.interface";
import usersModel from "../models/users.model";

import { CreateUserDTO } from "../interface/create-user.dto";
import axios from "axios";
import { IUserAnalytic } from "../interface/userAnalytics.interface";
import AnalyticsFactory from "../factory/analyticsFactory.factory";

class UsersService {
  async getUserByEmail(userEmail: string): Promise<IUser | undefined> {
    const user = await usersModel.findOne({
      email: userEmail,
    });

    if (!user) {
      throw { code: "001", message: "User not found" };
    }

    delete user.password;
    return user;
  }

  async getAllUsers(): Promise<IUser[]> {
    const users = await usersModel.find();

    for (const user of users) {
      user.password = undefined;
    }

    return users;
  }

  private generatePassword(): string {
    return Math.random().toString(36).substring(2, 7);
  }

  private sendUserEmail(userEmail: string, pass: string) {
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

    axios
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

  async createUser(newUserData: CreateUserDTO) {
    const pass: string =
      process.env.FAKE_PASS === "true" ? "123456" : this.generatePassword();
    const newUserSanitized: IUser = {
      name: newUserData.name,
      email: newUserData.email,
      roles: newUserData.roles,
      recoveryPassCode: "",
      signInQuantity: 0,
      watchedVideos: [],
      userAnalytics: AnalyticsFactory.createEmptyAnalytics(),
    };

    const newUser = new usersModel(newUserSanitized);
    await newUser.save();

    this.sendUserEmail(newUserData.email, pass);

    

    return newUser;
  }

  async deleteUser(userEmail: string) {
    const user = await usersModel.findOne({
      email: userEmail,
    });

    if (!user) {
      throw { code: "001", message: "User not found" };
    }

    usersModel.deleteOne({ email: userEmail });

    user.deleteOne();
  }

  async addUserWatchedVideo(userEmail: string, newVideo: string) {
    const user = await usersModel.findOne({
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
  }

  async registerUserAnalytics(userEmail: string, analytics: IUserAnalytic) {
    const user = await usersModel.findOne({
      email: userEmail,
    });

    if (!user) {
      throw { code: "001", message: "User not found" };
    }

    const newAnalytics = AnalyticsFactory.compareAnalytics(
      user.userAnalytics,
      analytics
    );

    user.userAnalytics = newAnalytics;
    await user.save();
  }
}

export default new UsersService();
