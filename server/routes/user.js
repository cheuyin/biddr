// Source: https://www.youtube.com/watch?v=favjC6EKFgw
// I used this series by Dave Lee to learn how to implement the authentication system

import express from "express";
import { QueryAppUserByEmail } from "../services/AppUserTable.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
    GetEmailByRefreshToken,
    GetRefreshTokenByUserEmail,
    SetRefreshTokenForUser,
} from "../services/RefreshTokenService.js";

const router = express.Router();

router.post("/signin", async (req, res, next) => {
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
            expiresIn: 45,
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
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });
    return res
        .status(200)
        .json({ message: "Passwords match!", accessToken });
});

export default router;
