import query from "../db.js";

export const GetRefreshTokenByUserEmail = async (email) => {
    try {
        return await query(
            "SELECT refreshtoken FROM appuser WHERE email = $1;",
            [email]
        );
    } catch (error) {
        throw error;
    }
};

export const GetEmailByRefreshToken = async (refreshToken) => {
    try {
        return await query(
            "SELECT email FROM appuser WHERE refreshtoken = $1;",
            [refreshToken]
        );
    } catch (error) {
        throw error;
    }
};

export const SetRefreshTokenForUser = async (email, refreshToken) => {
    try {
        return await query(
            "UPDATE appuser SET refreshtoken = $1 WHERE email = $2;",
            [refreshToken, email]
        );
    } catch (error) {
        throw error;
    }
};
