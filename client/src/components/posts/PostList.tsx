import React, { useEffect, useState } from 'react';
import Post from './Post.tsx';
import { Center, Grid, GridItem, Stack } from '@chakra-ui/react';

const PostList = ({ posts }) => {
  return (
    <>
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        {posts.map((post, index) => (
          <GridItem>
            <Post key={index} post={post} />
          </GridItem>
        ))}
      </Grid>
    </>
  );
};

export default PostList;
