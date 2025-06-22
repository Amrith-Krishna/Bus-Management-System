import jsonwebtoken from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

const { URI, PORT, SECRET_ACCESS_TOKEN, REFRESH_ACCESS_TOKEN } = process.env;

export const verifyJWT = (req,res,next) => {
    const authHeader = req.headers['authorization'];
    if(!authHeader) res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    jsonwebtoken.verify(
        token,
        SECRET_ACCESS_TOKEN,
        (err, decoded) => {
            if(err) res.sendStatus(403);
            req.user = decoded.reg;
        }
    )
}