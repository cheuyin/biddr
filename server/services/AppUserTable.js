import query from "../db.js";

/*
GET
*/

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

export const QueryAppUserByUsername = async (username) => {
    try {
        const result = await query(
            "SELECT * FROM AppUser WHERE username = $1",
            [username]
        );
        return result;
    } catch (error) {
        throw error;
    }
};

export const GetUserCommunities = async (email) => {
    try {
        const result = await query(
            "SELECT * FROM Community WHERE communityName IN (SELECT communityName FROM Joins WHERE email = $1)",
            [email]
        );
        return result;
    } catch (error) {
        throw error;
    }
};

export const GetLocationDateOfBirthIsLegalAge = async (
    location,
    dateOfBirth
) => {
    try {
        const result = await query(
            "SELECT * FROM LocationDateOfBirthLegalAge WHERE location = $1 AND dateOfBirth = $2",
            [location, dateOfBirth]
        );
        return result;
    } catch (error) {
        throw error;
    }
};

// Used to get all locations to display on sign-up form.
export const GetAllLocationAgeOfMajority = async () => {
    try {
        const result = await query("SELECT * FROM LocationAgeOfMajority");
        return result;
    } catch (error) {
        throw error;
    }
};

export const GetLocationAgeOfMajority = async (location) => {
    try {
        const result = await query(
            "SELECT * FROM LocationAgeOfMajority WHERE location = $1",
            [location]
        );
        return result;
    } catch (error) {
        throw error;
    }
};

/*
POST
*/

export const CreateAppUser = async (email, data) => {
    try {
        return await query(
            "INSERT INTO AppUser (email, username, profilePicture, fullName, hashedPassword, timeJoined,  bio, dateOfBirth, location) VALUES ($1, $2, $3, $4, $5, CURRENT_, $6, $7, $8)",
            [
                email,
                data.username,
                data.profilePicture,
                data.fullName,
                data.password,
                data.bio,
                data.dateOfBirth,
                data.location,
            ]
        );
    } catch (error) {
        throw error;
    }
};

export const CreateLocationDateOfBirthIsLegalAge = async (
    location,
    dateOfBirth,
    isLegalAge
) => {
    try {
        return await query(
            "INSERT INTO LocationDateOfBirthLegalAge (location, dateOfBirth, isLegalAge) VALUES ($1, $2, $3)",
            [location, dateOfBirth, isLegalAge]
        );
    } catch (error) {
        throw error;
    }
};

/*
PUT
*/

export const UpdateAppUser = async (email, data) => {
    try {
        return await query(
            "UPDATE AppUser SET username = $1, profilePicture = $2, fullName = $3, timeJoined = $4, bio = $5, dateOfBirth = $6, location = $7 WHERE email = $8",
            [
                data.username,
                data.profilePicture,
                data.fullName,
                data.timeJoined,
                data.bio,
                data.dateOfBirth,
                data.location,
                email,
            ]
        );
    } catch (error) {
        throw error;
    }
};

export const UpdateAppUserPassword = async (email, data) => {
    try {
        return await query(
            "UPDATE AppUser SET hashedPassword = $1 WHERE email = $2",
            [data.password, email]
        );
    } catch (error) {
        throw error;
    }
};
