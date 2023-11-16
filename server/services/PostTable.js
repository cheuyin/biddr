import query from "../db.js";

export const QueryPost = async (postId) => {
  try {
    const result = await query("SELECT * FROM post WHERE postId = $1", [
      postId,
    ]);
    return result;
  } catch (error) {
    throw error;
  }
};

export const QueryPostsInCommunity = async (name) => {
  try {
    const result = await query(
      "SELECT * FROM post WHERE communityName = $1 ORDER BY timePosted DESC",
      [name]
    );
    return result;
  } catch (error) {
    throw error;
  }
};

export const QueryPostsByUser = async (postedEmail) => {
  try {
    const result = await query(
      "SELECT * FROM post WHERE postedEmail = $1 ORDER BY timePosted DESC",
      [postedEmail]
    );
    return result;
  } catch (error) {
    throw error;
  }
};

export const CreatePost = async (
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
) => {
  try {
    const post = await query(
      "INSERT INTO Post (postedEmail, walletName, walletEmail, communityName, timePosted, expiryTime, text, image, title) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING postId",
      [
        postedEmail,
        walletName,
        walletEmail,
        communityName,
        currentDate,
        expiryTime,
        text,
        image,
        title,
      ]
    );
    const postId = post[0].postid;

    if (type === "auction") {
      return query("INSERT INTO auction (postId, minBid) VALUES ($1, $2)", [
        postId,
        value,
      ]);
    } else {
      return query("INSERT INTO fundraiser (postId, goal) VALUES ($1, $2)", [
        postId,
        value,
      ]);
    }
  } catch (error) {
    throw error;
  }
};
export const CancelPost = async (postId) => {
  try {
    return await query("DELETE FROM Post WHERE postId = $1", [postId]);
  } catch (error) {
    throw error;
  }
};

/*
LIKES TABLE
*/

export const CreateLikes = async (email, postId) => {
  try {
      await query("INSERT INTO Likes (email, postId) VALUES ($1, $2)",
      [
          email,
          postId
      ]);
  } catch (error) {
      throw error;
  }
};

export const DeleteLikes = async (email, postId) => {
  try {
    await query("DELETE FROM Likes WHERE email = $1 and postId = $2",
    [
      email,
      postId
    ]);
  } catch (error) {
    throw error;
  }
};

export const CountLikes = async(postId) => {
  try {
    const numLikes = await query("SELECT count(email) FROM Likes WHERE postId = $1", [postId]);
    return numLikes;
  } catch (error) {
    throw error;
  }
};
