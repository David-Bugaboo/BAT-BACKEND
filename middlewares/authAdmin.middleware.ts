import { NextFunction, Request, Response } from "express";

const protectedRoutes = (req, res:Response, next:NextFunction) => {

    const roles = req.user.roles

    if (roles.includes("admin"))
        return next()

    if (req.params.useremail || req.params.email)

    if (req.params.useremail === req.authInfo.preferred_username){
        return next()
    }

    else {
        return res.status(401).json({error:"admin rights are needed to access this route!"})
    }

}