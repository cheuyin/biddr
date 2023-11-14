// Source: https://www.youtube.com/watch?v=favjC6EKFgw (21:08)
// I used this series by Dave Lee to learn how to implement the authentication system

import jwt from "jsonwebtoken";

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.sendStatus(401);
    }
    console.log(authHeader);
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_ACCESS_TOKEN_KEY, (error, decoded) => {
        if (error) {
            return res.sendStatus(403);
        }
        next();
    });
};

export default verifyJWT;
