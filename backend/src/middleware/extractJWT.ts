import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'

const extractJWT = (req: Request, res: Response, next: NextFunction) => {
    console.log("Validating Token...");
    let token = req.headers.authorization?.split(' ')[1];

    if (token) {
        jwt.verify(token, "superencryptedsecret", (error, decoded) => {
            if (error) {
                return res.status(404).json({
                    message: error.message,
                    error
                })
            }
            res.locals.jwt = decoded;
            next();
        });
    }
    else {
        return res.status(401).json({
            message: "JWT Authentication Failed"
        })
    }
}

export default extractJWT;