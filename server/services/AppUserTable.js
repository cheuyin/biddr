import query from "../db.js";

export const QueryAppUserByEmail = async (email) => {
    try {
        const result = await query("SELECT * FROM AppUser WHERE email = $1", [
            email,
        ]);
        return result;
    } catch (error) {
        throw error;
    }
};

export const CreateAppUser = async (email, data) => {
    try {
        return await query(
            "INSERT INTO AppUser (email, username, profilePicture, fullName, hashedPassword, timeJoined,  bio, dateOfBirth, location) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
            [email, data.username, data.profilePicture, data.fullName, data.hashedPassword, data.timeJoined, data.bio, data.dateOfBirth, data.location]
        );
    } catch (error) {
        throw error;
    }
};