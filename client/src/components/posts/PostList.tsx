import React, { useEffect, useState } from "react";
import Post from "./Post.tsx";

const PostList = ({ posts }) => {
  return (
    <>
      {posts.map((post, index) => (
        <Post key={index} post={post} />
      ))}
    </>
  );
};

export default PostList;
