// Source: https://www.youtube.com/watch?v=favjC6EKFgw (46:00)

import {
    GetEmailByRefreshToken,
    SetRefreshTokenForUser,
} from "../services/RefreshTokenService.js";

// This controller handles logout on the server side
// On the client side, the client should also delete their tokens
const LogoutController = async (req, res) => {
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

export default LogoutController;
