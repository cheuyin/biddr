import express from "express";
import { QueryAppUserByEmail } from "../services/AppUserTable.js";
import bcrypt from "bcrypt";

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
        if (!user) {
            return res
                .status(404)
                .json({ error: "User with that email does not exist." });
        }
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }

    const isCorrectPassword = bcrypt.compareSync(password, user.hashedpassword);

    if (isCorrectPassword) {
        return res.status(200).json({ message: "Passwords match!" });
    } else {
        return res.status(401).json({ error: "Password is incorrect." });
    }
});

export default router;
