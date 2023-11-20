import { QueryAppUserByEmail } from "../services/AppUserTable.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SetRefreshTokenForUser } from "../services/RefreshTokenService.js";
import { GetEmailByRefreshToken } from "../services/RefreshTokenService.js";

export const Signin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res
            .status(400)
            .json({ error: "Email or password not provided" });
    }

    let user;
    try {
        user = await QueryAppUserByEmail(email);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }

    if (!user) {
        return res
            .status(404)
            .json({ error: "User with that email does not exist." });
    }

    const isCorrectPassword = bcrypt.compareSync(password, user.hashedpassword);

    if (!isCorrectPassword) {
        return res.status(401).json({ error: "Password is incorrect." });
    }

    // create the json web tokens
    const accessToken = jwt.sign(
        {
            email: user.email,
        },
        process.env.JWT_ACCESS_TOKEN_KEY,
        {
            expiresIn: 15, // Expires in 15 seconds (for testing purposes)
        }
    );
    const refreshToken = jwt.sign(
        {
            email: user.email,
        },
        process.env.JWT_REFRESH_TOKEN_KEY,
        {
            expiresIn: "3d",
        }
    );

    // save a new refresh token in the appuser database table whenever a user logs in
    try {
        await SetRefreshTokenForUser(user.email, refreshToken);
    } catch (error) {
        return res.status(500).json({
            error: "There was an error saving refresh tokens in the database.",
            message: error.message,
        });
    }

    /*
    if sign-in is successful, then do the following:
        - send a refresh token to the client via http cookies
        - send the access token to the client via a json response
    */
    res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true, // Must be set to true if we use sameSite: "none"
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });

    return res.status(200).json({ message: "Passwords match!", accessToken });
};

// Source: https://www.youtube.com/watch?v=favjC6EKFgw (32:12)
export const Refresh = async (req, res) => {
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
        return res.status(500).json({ error: error.message });
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
                { expiresIn: 15 } // Expires in 60 seconds (for testing purposes)
            );

            return res.status(200).json({ accessToken });
        }
    );
};

// Source: https://www.youtube.com/watch?v=favjC6EKFgw (46:00)
export const Logout = async (req, res) => {
    // If no refresh token in request cookie, then send successful request because user is already logged out
    if (!req.cookies || !req.cookies.jwt) {
        return res.sendStatus(204); // Success, but no content
    }

    const refreshToken = req.cookies.jwt;

    let userEmail;
    try {
        const result = await GetEmailByRefreshToken(refreshToken);
        // If no token exists in the database (already deleted), then clear client cookies and send success response
        if (result.length === 0) {
            res.clearCookie("jwt", {
                httpOnly: true,
                sameSite: "none",
                secure: true, // Must be set to true!
                maxAge: 24 * 60 * 60 * 1000,
            });
            return res.sendStatus(204); // Success response because token is already deleted
        }
        userEmail = result[0].email;
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

    try {
        await SetRefreshTokenForUser(userEmail, null);
    } catch (error) {
        return res.sendStatus(500);
    }

    // Clear client cookies when refresh token is successfully deleted
    res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "none",
        secure: true, // Must be set to true!
        maxAge: 24 * 60 * 60 * 1000,
    });
    return res.sendStatus(204);
};
