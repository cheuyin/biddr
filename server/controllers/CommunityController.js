// import { QueryStudentByID } from "../services/StudentTable.js";
import { QueryCommunityByName } from "../services/CommunityTable.js";
import { QueryAllCommunityPostsByName } from "../services/CommunityTable.js";

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
