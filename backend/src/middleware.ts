import { Request,Response,NextFunction } from "express";
import  Jwt  from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";
export const Usermiddleware=(req: Request, res: Response, next: NextFunction)=>{
    const header=req.headers["authorization"];
    const decoded=Jwt.verify(header as string, JWT_SECRET)
    if(decoded){
        //@ts-ignore
        req.userId=decoded.id;
        next();

    }
    else{
        res.status(403).json({
            messege: "you are not logged in "
        })
    }

}