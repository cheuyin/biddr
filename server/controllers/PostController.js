import {
  CancelPost,
  CreatePost,
  QueryPost,
  QueryPostsByUser,
  QueryPostsInCommunity,
} from "../services/PostTable.js";

export const GetPost = async (req, res) => {
  const postId = req.params.postId;
  console.log(new Date().toISOString().replace(/\.\d*Z/, ""));

  try {
    const data = await QueryPost(postId);
    return res.status(200).json(data);
  } catch (err) {
    return res.send(err.toString());
  }
};

export const GetMostRecentPostsInCommunity = async (req, res) => {
  const name = req.params.name;
  try {
    const data = await QueryPostsInCommunity(name);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(400).json({ error: "Can't give ya those posts" });
  }
};
export const GetMostRecentPostsByUser = async (req, res) => {
  const email = req.params.postedEmail;
  try {
    const data = await QueryPostsByUser(email);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(400).json({ error: "Can't give ya those posts" });
  }
};

export const PostPost = async (req, res) => {
  const {
    type,
    postedEmail,
    walletName,
    walletEmail,
    communityName,
    expiryTime,
    text,
    title,
    image,
    value,
  } = req.body;
  if (
    !type ||
    !postedEmail ||
    !walletName ||
    !walletEmail ||
    !communityName ||
    !expiryTime ||
    !text ||
    !title ||
    !value
  ) {
    return res.status(400).json({ error: "Ur missing something yeah" });
  }
  if (type !== "auction" && type !== "fundraiser") {
    return res
      .status(400)
      .json({ error: "so is it an auction or a fundraiser huh?" });
  }
  const currentDate = new Date().toISOString().replace(/\.\d*Z/, "");
  try {
    await CreatePost(
      type,
      postedEmail,
      walletName,
      walletEmail,
      communityName,
      currentDate,
      expiryTime,
      text,
      title,
      image,
      value
    );
    return res.status(200).json({ message: "Created new Post" });
  } catch (err) {
    if (err.code == 23505) {
      return res.status(409).json({ message: "That post already exists!" });
    }
    return res.send(err.toString());
  }
};
export const DeletePost = async (req, res) => {
  const postId = req.params.postId;
  try {
    await CancelPost(postId);
    return res.status(200).json({ message: "Post is now gone" });
  } catch (err) {
    return res.send(err.toString());
  }
};
