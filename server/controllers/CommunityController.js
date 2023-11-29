import {
  FilterCommunities,
  QueryCommunityByName,
} from "../services/CommunityTable.js";
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
    return res.status(200).json({ message: "Updated community" });
  } catch (err) {
    return res.status(400).json({ error: err.toString() });
  }
};

export const PostCommunity = async (req, res) => {
  const { communityName, email, longName, description } = req.body;
  if (!communityName || !email || !longName || !description) {
    return res.status(400).json({ error: "🐍missssssssing fields" });
  }
  try {
    await CreateCommunity(communityName, req.body);
    return res.status(200).json({ message: "Created community" });
  } catch (err) {
    if (err.code == 23505) {
      return res.status(409).json({ message: "It already exists🙀😱🤯😮" });
    }
    return res.status(400).json({ error: err.toString() });
  }
};

export const DeleteCommunity = async (req, res) => {
  const communityName = req.params.name;
  try {
    await BanishCommunity(communityName);
    return res.status(200).json({ message: "Community destroyed" });
  } catch (err) {
    return res.status(400).json({ error: err.toString() });
  }
};

export const UserJoinCommunity = async (req, res) => {
  const { communityName, email } = req.body;
  if (!communityName || !email) {
    return res.status(400).json({ error: "missing fields" });
  }
  try {
    await CreateJoin(communityName, email);
    return res.status(201).json({ message: "Successfully joined!" });
  } catch (err) {
    return res.status(400).json({ error: err.toString() });
  }
};

export const UserLeaveCommunity = async (req, res) => {
  const { communityName, email } = req.body;
  if (!communityName || !email) {
    return res.status(400).json({ error: "missing fields" });
  }
  try {
    await RemoveJoin(communityName, email);
    return res
      .status(201)
      .json({ message: "Good for you, not the best community, eh" });
  } catch (err) {
    return res.status(400).json({ error: err.toString() });
  }
};

export const SearchCommunities = async (req, res) => {
  const { queries } = req.body;
  const attributes = ["communityname", "email", "longname"];
  const types = ["and", "or"];
  const unsafe = queries.some((item) => {
    if (!item.attribute || !item.value || !item.type) {
      // return res.status(400).json({ error: "malformed query" });
      return true;
    }
    if (!attributes.includes(item.attribute.toLowerCase())) {
      // return res.status(400).json({ error: "Do not sql inject pls" });
      return true;
    }
    if (!types.includes(item.type.toLowerCase())) {
      // return res.status(400).json({ error: "Do not sql inject pls" });
      return true;
    }
    return false;
  });

  if (unsafe) {
    return res.status(400).json({ error: "Do not sql inject pls" });
  }
  try {
    const data = await FilterCommunities(queries);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(400).json({ error: err.toString() });
  }
};
