import Jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";
export const Usermiddleware = (req, res, next) => {
    const header = req.headers["authorization"];
    const decoded = Jwt.verify(header, JWT_SECRET);
    if (decoded) {
        //@ts-ignore
        req.userId = decoded.id;
        next();
    }
    else {
        res.status(403).json({
            messege: "you are not logged in "
        });
    }
};
