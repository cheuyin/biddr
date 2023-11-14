// Source: https://www.youtube.com/watch?v=favjC6EKFgw (32:12)

import jwt from "jsonwebtoken";
import { GetEmailByRefreshToken } from "../services/RefreshTokenService.js";

const RefreshController = async (req, res) => {
    const cookies = req.cookies;

    // If cookies don't contain a JWT refresh token, then return status unauthorized
    if (!cookies || !cookies.jwt) {
        return res.sendStatus(401); // Unauthorized
    }

    const refreshToken = cookies.jwt;

    let userEmail;
    try {
        const result = await GetEmailByRefreshToken(refreshToken);
        if (result.length === 0) {
            return res.sendStatus(403); // Forbidden - no users returned
        }
        userEmail = result[0].email;
    } catch (error) {
        return res.status(500).json(error);
    }

    // If the refresh token matches the one stored in the db, then send user a new access token
    jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_TOKEN_KEY,
        (err, decoded) => {
            if (err || userEmail !== decoded.email) {
                return res.sendStatus(403); // Forbidden
            }

            const accessToken = jwt.sign(
                {
                    email: decoded.email,
                },
                process.env.JWT_ACCESS_TOKEN_KEY,
                { expiresIn: 45 }
            );

            return res.status(200).json({ accessToken });
        }
    );
};

export default RefreshController;
