import React, { useState } from "react";
import { Button, Card, GridItem, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const CommunitySearch = ({}) => {
  const [searchQuery, setSearchQuery] = useState([]);
  const [query, setQuery] = useState<any[]>([0, "", ""]);
  const navigate = useNavigate();

  const handleClick = (event) => {
    console.log("Box!");

    event.stopPropagation();
    // navigate(`/community/${com.communityname}`);
  };

  return (
    <>
      {searchQuery.map((val, ind) => (
        <Text>{val}</Text>
      ))}

      <Button>Add</Button>
      <Button>Search</Button>
    </>
  );
};

export default CommunitySearch;
