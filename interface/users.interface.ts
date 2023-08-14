import { IUserAnalytic } from "./userAnalytics.interface";

export interface IUser {
    name: string;
    email: string;
    roles: string[];
    password?: string;
    recoveryPassCode?: string;
    signInQuantity: number;
    watchedVideos: string[]
    userAnalytics: IUserAnalytic
}