import express from "express";
import { QueryAppUserByEmail } from "../services/AppUserTable.js";

const router = express.Router();

router.post("/signin", async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res
            .status(400)
            .json({ error: "Email or password not provided" });
    }

    try {
        const user = await QueryAppUserByEmail(email);
        return res
            .status(200)
            .json({
                message: `You looked for: ${user.email}. His password is ${user.hashedpassword}.`,
            });
    } catch (error) {
        return res.status(400).json({ error });
    }
});

export default router;
