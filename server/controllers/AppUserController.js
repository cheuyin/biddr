import { QueryAppUserByEmail, CreateAppUser, UpdateAppUser, UpdateAppUserPassword, CreateLocationDateOfBirthIsLegalAge, GetLocationAgeOfMajority } from "../services/AppUserTable.js";
import { getAge } from "../helpers/helpers.js";
import bcrypt from "bcrypt"

export const GetAppUserByEmail = async (req, res) => {
    const userEmail = req.params.email;
    try {
        const data = await QueryAppUserByEmail(userEmail);
        res.status(200).json(data)
    } catch (err) {
        res.send(err.toString())
    }
};

export const PostAppUser = async (req, res) => {
    const { email, username, fullName, hashedPassword, timeJoined, location, dateOfBirth } = req.body;
    /*
    These are the attributes labeled NOT NULL in the table creation script.
    We are just checking here that they are not missing from the request.
    */
    if(!email || !username || !fullName || !hashedPassword || !timeJoined) {
        return res.status(400).json({error: "Missing fields"})
    }
    try {
        // If location and dateOfBirth are defined, we need to add tuple in LocationDateOfBirthIsLegal age.
        if (location && dateOfBirth) {
            const locationAgeOfMajority = await GetLocationAgeOfMajority(location);
            const ageOfMajority = locationAgeOfMajority[0].ageofmajority;
            const userAge = getAge(dateOfBirth);
            const isLegalAge = userAge >= ageOfMajority;
            // possibly return res.status(400).json({error: "User is not old enough to make an account"}); if !isLegalAge
            await CreateLocationDateOfBirthIsLegalAge(location, dateOfBirth, isLegalAge);
        }
        // Create hashed password and store in req.body - to unhash, call bcrypt.compareSync
        const hash = bcrypt.hashSync(hashedPassword, 10);
        req.body.hashedPassword = hash;
        await CreateAppUser(email, req.body)
        res.status(200).json({message: `Created new AppUser with email: ${email}`})
    } catch(err) {
        res.send(err.toString())
    }
};

export const PutAppUser = async (req, res) => {
    const userEmail = req.params.email;
    const { email, username, fullName, timeJoined } = req.body;
    if(!email || !username || !fullName || !timeJoined) {
        return res.status(400).json({error: "Missing fields"})
    }
    try {
        await UpdateAppUser(userEmail, req.body);
        res.status(200).json({message: "Updated user successfully"});
    } catch(err) {
        res.send(err.toString());
    }
};

export const PutAppUserPassword = async (req, res) => {
    const userEmail = req.params.email;
    const { email, password } = req.body;
    if(!email || !password) {
        return res.status(400).json({error: "Missing password"})
    }
    try {
        // Check that new password is different than the old password.
        const userData = await QueryAppUserByEmail(userEmail);
        const oldPasswordHash = userData[0].hashedpassword;
        const samePassword = bcrypt.compareSync(password, oldPasswordHash);
        if (samePassword) {
            return res.status(400).json({error: "New password is the same as the old password"});
        }
        // Create new hashed password and store in req.body.
        const newPasswordHash = bcrypt.hashSync(password, 10);
        req.body.password = newPasswordHash;
        await UpdateAppUserPassword(userEmail, req.body);
        res.status(200).json({message: "Updated user successfully"});
    } catch(err) {
        res.send(err.toString());
    }
};
