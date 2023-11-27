import { QueryAppUserByEmail,
    QueryAppUserByUsername,
    CreateAppUser,
    UpdateAppUser,
    UpdateAppUserPassword,
    CreateLocationDateOfBirthIsLegalAge,
    GetLocationDateOfBirthIsLegalAge,
    GetLocationAgeOfMajority,
    GetAllLocationAgeOfMajority,
    GetUserCommunities } from "../services/AppUserTable.js";
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
    const { email, username, fullName, password, location, dateOfBirth } = req.body;
    /*
    These are the attributes labeled NOT NULL in the table creation script.
    We are just checking here that they are not missing from the request.
    */
   
    if (!email || !username || !fullName || !password || !location || !dateOfBirth) {
        return res.status(400).json({error: "Missing fields"})
    }

    try {
        // Ensure that email does not already exist
        const emailExists = await QueryAppUserByEmail(email)

        if (emailExists && emailExists[0]) {
           return res.status(400).json({error: "Email already exists"});
        }

        // Ensure that username does not already exist
        const usernameExists = await QueryAppUserByUsername(username)
        if (usernameExists[0]) {
           return res.status(400).json({error: "Username already exists"});
        }


        // If location and dateOfBirth are defined, we need to add tuple in LocationDateOfBirthIsLegal age.
        if (location && dateOfBirth) {
            const locationAgeOfMajority = await GetLocationAgeOfMajority(location);
            const ageOfMajority = locationAgeOfMajority[0].ageofmajority;
            const userAge = getAge(dateOfBirth);
            const isLegalAge = userAge >= ageOfMajority;
            const tupleExists = await GetLocationDateOfBirthIsLegalAge(location, dateOfBirth);
            // only create tuple if it doesn't already exist.
            if(!tupleExists[0]) {
                await CreateLocationDateOfBirthIsLegalAge(location, dateOfBirth, isLegalAge);
            }
        }
        // Create hashed password and store in req.body - to unhash, call bcrypt.compareSync
        req.body.password = bcrypt.hashSync(password, 10);
        await CreateAppUser(email, req.body)
        res.status(200).json({message: `Created new AppUser with email: ${email}`})
    } catch(err) {
        res.status(400).json({error: err.toString()})
    }
};

export const ChangeAppUserInformation = async (req, res) => {
    const userEmail = req.params.email;
    const { email, username, fullName, location } = req.body;
    if(!email || !username || !fullName || !location) {
        return res.status(400).json({error: "Missing fields"})
    }
    try {
        // Ensure that username does not already exist
        const usernameExists = await QueryAppUserByUsername(username)
        if (usernameExists[0] && usernameExists[0].email !== userEmail) {
           return res.status(403).json({error: "Username already exists"});
        }
        // Search for and create new tuple in locationDateOfBirthIsLegal age (if it doesn't already exist) for new location.
        const user = await QueryAppUserByEmail(userEmail);
        if (user[0].location !== location) {
            const dateOfBirth = user[0].dateofbirth;
            const tupleExists = await GetLocationDateOfBirthIsLegalAge(location, dateOfBirth)
            if(!tupleExists[0]) {
                const locationAgeOfMajority = await GetLocationAgeOfMajority(location);
                const ageOfMajority = locationAgeOfMajority[0].ageofmajority;
                const userAge = getAge(dateOfBirth);
                const isLegalAge = userAge >= ageOfMajority;
                await CreateLocationDateOfBirthIsLegalAge(location, dateOfBirth, isLegalAge);
            }
        }
        await UpdateAppUser(userEmail, req.body);
        res.status(200).json({message: "Updated user successfully"});
    } catch(err) {
        res.send(err.toString());
    }
};

export const ChangeAppUserPassword = async (req, res) => {
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

export const GetLocationAgeOfMajorityValues = async (req, res) => {
    try {
        const data = await GetAllLocationAgeOfMajority();
        res.status(200).json(data);
    } catch(err) {
        res.send(err.toString());
    }
};

export const GetUserSubscribedCommunities = async (req, res) => {
    const userEmail = req.params.email;
    try {
        const data = await GetUserCommunities(userEmail);
        res.status(200).json(data);
    } catch(err) {
        res.send(err.toString());
    }
};
