import { Request, Response } from "express";
import { CreateUserDTO } from "../interface/create-user.dto";
import usersModel from "../models/users.model";
import usersService from "../services/users.service";

class UsersController {
    async getAll(req: Request, res: Response) {
        try {
            const request = await usersService.getAllUsers();

            return res.status(200).json(request);
        } catch (e: any) {
            console.error(e);
            return res.status(404).json({ message: "Was not possible to get users"});
        }
    }

    async getUserByEmail(req: Request, res: Response) {
        const userEmail = req.params.email;

        if(!userEmail)
            throw Error('Argument email not found');

        try {
            const request = await usersService.getUserByEmail(userEmail);

            return res.status(200).json(request);
        } catch (e: any) {
            console.error(e);
            return res.status(404).json(e);
        }
    }

    async createUser(req: Request, res: Response) {
        const newUser: CreateUserDTO = req.body.userData;
        
        const alreadExistentUser = await usersModel.findOne({
            email: newUser.email,
          });

        if(alreadExistentUser)
                return res.status(400).json('user already exists');

        try {
            await usersService.createUser(req.body.userData);
            return res.status(201).json();
        } catch (e: any) {
            console.error(e);
            return res.status(404).json(e);
        }
    }

    async deleteUserByEmail(req: Request, res: Response) {
        const userEmail = req.params.email;

        if(!userEmail)
            throw Error('Argument email not found');

        try {
            await usersService.deleteUser(userEmail);

            return res.status(201).json();
        } catch (e: any) {
            console.error(e);
            return res.status(404).json(e);
        }
    }

    async addUserWatchedVideo(req, res) {
        const userEmail = req.params.email;
        const video: string = req.body.video;

        if(!userEmail)
            throw Error('Argument email not found');

        if(!video)
            throw Error('Argument video not found');

        try {
            const request = await usersService.addUserWatchedVideo(userEmail, video);

            return res.status(200).json(request);
        } catch (e: any) {
            console.error(e);
            return res.status(404).json(e);
        }
    }
}

export default new UsersController();