import query from "../db.js";

export const QueryCommunityByName = async (communityName) => {
  try {
    const result = await query(
      "SELECT * FROM community WHERE communityName = $1",
      [communityName]
    );
    return result;
  } catch (error) {
    throw error;
  }
};

export const QueryAllCommunityPostsByName = async (communityName) => {
  try {
    const result = await query("SELECT * FROM post WHERE communityName = $1", [
      communityName,
    ]);
    return result;
  } catch (error) {
    throw error;
  }
};
