import authService from "../services/auth.service";
import { Request, Response } from "express";
import {IUser} from '../interface/users.interface'

class AuthController {
    async signIn(req: Request, res: Response) {
        // TODO: check if has email and password on payload    

        const email = req.body.email;
        const password = req.body.password;

        if(!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        try {
          const response = await authService.signIn(email, password);
          return res.status(200).send(response);
        } catch (err) {
          console.error(err);
          res.status(400).send(`Was not possible to sig in this user`);
        }
      }
}

export default new AuthController();