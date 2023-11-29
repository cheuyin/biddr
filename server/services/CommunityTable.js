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

export const UpdateCommunity = async (
  communityName,
  email,
  longName,
  description
) => {
  try {
    return await query(
      "UPDATE Community SET email = $1, longName = $2, description = $3 WHERE communityName = $4",
      [email, longName, description, communityName]
    );
    // return 0;
  } catch (error) {
    throw error;
  }
};

export const CreateCommunity = async (communityName, data) => {
  try {
    return await query(
      "INSERT INTO Community (communityName, email, longName, description) VALUES ($1, $2, $3, $4)",
      [communityName, data.email, data.longName, data.description]
    );
  } catch (error) {
    throw error;
  }
};

export const BanishCommunity = async (communityName) => {
  try {
    return await query("DELETE FROM Community WHERE communityName = $1", [
      communityName,
    ]);
  } catch (error) {
    throw error;
  }
};

export const CreateJoin = async (name, email) => {
  try {
    return await query(
      "INSERT INTO Joins(communityName, email) VALUES ($1, $2)",
      [name, email]
    );
  } catch (error) {
    return error;
  }
};

export const RemoveJoin = async (name, email) => {
  try {
    return await query(
      "DELETE FROM Joins WHERE communityName = $1 AND email = $2",
      [name, email]
    );
  } catch (error) {
    return error;
  }
};

export const FilterCommunities = async (queries) => {
  let template = `SELECT * FROM community`;
  if (queries.length > 0) {
    template = template.concat(" ", "WHERE");
  }
  queries.forEach((item, index) => {
    if (index !== 0) {
      template = template.concat(" ", item.type);
    }
    template = template.concat(" ", `${item.attribute} = $${index + 1}`);
  });
  try {
    return await query(
      template,
      queries.map((item) => {
        return item.value;
      })
    );
  } catch (error) {
    return error;
  }
};
