// import { QueryStudentByID } from "../services/StudentTable.js";
import { QueryCommunityByName } from "../services/CommunityTable.js";
import { QueryAllCommunityPostsByName } from "../services/CommunityTable.js";
import { UpdateCommunity } from "../services/CommunityTable.js";
import { CreateCommunity } from "../services/CommunityTable.js";
import { BanishCommunity } from "../services/CommunityTable.js";

export const GetCommunityByName = async (req, res) => {
  const communityName = req.params.name;
  console.log(req.query);
  console.log(req.query);
  try {
    const data = await QueryCommunityByName(communityName);
    res.status(200).json(data);
  } catch (err) {
    res.send(err.toString());
  }
};

export const GetCommunityPosts = async (req, res) => {
  const communityName = req.params.name;
  console.log(req.query);
  console.log(req.query);
  try {
    const data = await QueryAllCommunityPostsByName(communityName);
    res.status(200).json(data);
  } catch (err) {
    res.send(err.toString());
  }
};

export const PutCommunity = async (req, res) => {
  const communityName = req.params.name;
  const { email, longname, description } = req.body;
  if (!email || !longname || !description) {
    return res.status(400).json({ error: "Need not null values for the 3" });
  }
  try {
    await UpdateCommunity(communityName, email, longname, description);
    res.status(200).json({ message: "Updated community" });
  } catch (err) {
    res.send(err.toString());
  }
};

export const PostCommunity = async (req, res) => {
  const { communityname, email, longname, description } = req.body;
  if (!communityname || !email || !longname || !description) {
    return res.status(400).json({ error: "misssing fieldns" });
  }
  try {
    await CreateCommunity(communityname, req.body);
    res.status(200).json({ message: "Created community" });
  } catch (err) {
    if (err.code == 23505) {
      res.status(409).json({ message: "It already exists🙀😱🤯😮" });
    }
    res.send(err.toString());
  }
};

export const DeleteCommunity = async (req, res) => {
  const communityName = req.params.name;
  try {
    await BanishCommunity(communityName);
    res.status(200).json({ message: "Community destroyed" });
  } catch (err) {
    res.send(err.toString());
  }
};
