import { Request,Response,NextFunction } from "express";
import  Jwt  from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";
export const Usermiddleware=(req: Request, res: Response, next: NextFunction)=>{
    try {
        const header=req.headers["authorization"];
        if (!header) {
            return res.status(403).json({
                message: "Authorization header missing"
            });
        }
        const decoded=Jwt.verify(header as string, JWT_SECRET) as any;
        if(decoded && decoded.id){
            //@ts-ignore
            req.userId=decoded.id;
            next();
        }
        else{
            res.status(403).json({
                message: "Invalid token"
            })
        }
    } catch (error) {
        res.status(403).json({
            message: "Invalid token"
        })
    }
}