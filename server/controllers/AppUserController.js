import { QueryAppUserByEmail, CreateAppUser } from "../services/AppUserTable.js";
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
    const { email, username, fullName, hashedPassword, timeJoined } = req.body;
    /*
    These are the attributes labeled NOT NULL in the table creation script.
    We are just checking here that they are not missing from the request.
    */
    if(!email || !username || !fullName || !hashedPassword || !timeJoined) {
        return res.status(400).json({error: "Missing fields"})
    }
    try {
        // Create hashed password and store in req.body - to unhash, call bcrypt.compareSync
        const hash = bcrypt.hashSync(hashedPassword, 10);
        req.body.hashedPassword = hash;
        await CreateAppUser(email, req.body)
        res.status(200).json({message: `Created new AppUser with email: ${email}`})
    } catch(err) {
        res.send(err.toString())
    }
};
