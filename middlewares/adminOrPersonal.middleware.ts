import { NextFunction, Request, Response } from "express";

const adminOrPersonalMiddleware = (req: any, res: Response, next: NextFunction) => {

    const roles = req.user.roles

    if (roles.includes("admin"))
        return next()

    if (req.params.useremail && req.params.usermail === req.user.preferred_username) {
        next()
    }
    if (req.params.email && req.params.email === req.user.preferred_username) {
        next()
    }

    return res.status(401).json({ error: "insuficient permission" })


}