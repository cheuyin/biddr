import express from "express";
import { QueryAppUserByEmail } from "../services/AppUserTable.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import query from "../db.js";

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
            expiresIn: 15 * 60,
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

    // save refresh tokens in the database
    try {
        const result = await query(
            "sELECT * FROM refreshtokens WHERE email = $1",
            [user.email]
        );
        if (result.length === 0) {
            await query(
                "INSERT INTO refreshtokens (email, token) VALUES ($1, $2);",
                [user.email, refreshToken]
            );
        } else {
            await query(
                "UPDATE refreshtokens SET token = $1 WHERE email = $2",
                [user.refreshToken, user.email]
            );
        }
    } catch (error) {
        return res.status(500).json({
            error: "There was an error saving refresh tokens in the database.",
        });
    }

    // return success result + access token to the user
    return res
        .status(200)
        .json({ message: "Passwords match!", accessToken: accessToken });
});

export default router;
