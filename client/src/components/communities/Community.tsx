import React from "react";
import { Card, GridItem, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Community = ({ com }) => {
  const navigate = useNavigate();

  const handleClick = (event) => {
    console.log("Box!");

    event.stopPropagation();
    navigate(`/community/${com.communityname}`);
  };

  return (
    <Card maxW="xl" mb="4" p="4" onClick={handleClick} cursor="pointer">
      <GridItem w="100%" h="200" overflow="scroll">
        <Heading size="md">{com.communityname}</Heading>
        <Text>{com.email}</Text>
        <Text>{com.longname}</Text>
        <Text>{com.description}</Text>
      </GridItem>
    </Card>
  );
};

export default Community;
