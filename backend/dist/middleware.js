import Jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";
export const Usermiddleware = (req, res, next) => {
    try {
        const header = req.headers["authorization"];
        if (!header) {
            return res.status(403).json({
                message: "Authorization header missing"
            });
        }
        const decoded = Jwt.verify(header, JWT_SECRET);
        if (decoded && decoded.id) {
            //@ts-ignore
            req.userId = decoded.id;
            next();
        }
        else {
            res.status(403).json({
                message: "Invalid token"
            });
        }
    }
    catch (error) {
        res.status(403).json({
            message: "Invalid token"
        });
    }
};
