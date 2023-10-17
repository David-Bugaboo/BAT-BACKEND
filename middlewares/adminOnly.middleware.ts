import { NextFunction, Request, Response } from "express";

const AdminOnlyMiddleware = (req:any, res:Response, next:NextFunction) => {

    const roles = req.user.roles

    if (roles.includes("admin")){
        return next()
    }
    else {
        return res.status(401).json({error:"insuficient permission"})
    }

}