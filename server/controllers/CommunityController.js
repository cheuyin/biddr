import { QueryCommunityByName } from "../services/CommunityTable.js";
import { UpdateCommunity } from "../services/CommunityTable.js";
import { CreateCommunity } from "../services/CommunityTable.js";
import { BanishCommunity } from "../services/CommunityTable.js";
import { CreateJoin } from "../services/CommunityTable.js";
import { RemoveJoin } from "../services/CommunityTable.js";

export const GetCommunityByName = async (req, res) => {
  const communityName = req.params.name;
  try {
    const data = await QueryCommunityByName(communityName);
    res.status(200).json(data);
  } catch (err) {
    res.send(err.toString());
  }
};

export const PutCommunity = async (req, res) => {
  const communityName = req.params.name;
  const { email, longName, description } = req.body;
  if (!email || !longName || !description) {
    return res.status(400).json({ error: "Need not null values for the 3" });
  }
  try {
    await UpdateCommunity(communityName, email, longName, description);
    res.status(200).json({ message: "Updated community" });
  } catch (err) {
    res.send(err.toString());
  }
};

export const PostCommunity = async (req, res) => {
  const { communityName, email, longName, description } = req.body;
  if (!communityName || !email || !longName || !description) {
    return res.status(400).json({ error: "🐍missssssssing fields" });
  }
  try {
    await CreateCommunity(communityName, req.body);
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

export const UserJoinCommunity = async (req, res) => {
  const { communityName, email } = req.body;
  if (!communityName || !email) {
    return res.status(400).json({ error: "missing fields" });
  }
  try {
    await CreateJoin(communityName, email);
    res.status(201).json({ message: "Successfully joined!" });
  } catch (err) {
    res.send(err.toString());
  }
};

export const UserLeaveCommunity = async (req, res) => {
  const { communityName, email } = req.body;
  if (!communityName || !email) {
    return res.status(400).json({ error: "missing fields" });
  }
  try {
    await RemoveJoin(communityName, email);
    res
      .status(201)
      .json({ message: "Good for you, not the best community, eh" });
  } catch (err) {
    res.send(err.toString());
  }
};
