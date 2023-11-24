import React, { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { DateTime } from "luxon";

const Comment = ({ comment }) => {
  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" backgroundColor="white">
      <Box ml={3}>
        <Text fontWeight="bold">{comment.email}</Text>
        <Text fontSize="sm" color="gray.500">
          {DateTime.fromISO(comment.timesent).toRelative()}
        </Text>
        <Text mt={2}>{comment.text}</Text>
      </Box>
    </Box>
  );
};

const CommentList = ({ comments }) => {
  return (
    <>
      {comments.length > 0
        ? comments.map((comment, index) => (
            <Comment key={index} comment={comment} />
          ))
        : "No comments yet"}
    </>
  );
};

export default CommentList;
