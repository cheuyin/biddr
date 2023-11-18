// Source: https://www.youtube.com/watch?v=favjC6EKFgw (55:29)

import allowedOrigins from "../config/allowedOrigins.js";

// Informs the client about whether their origin is allowed to make requests to this server
const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Credentials", true);
    }
    next();
};

export default credentials;
