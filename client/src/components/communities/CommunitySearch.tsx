import React, { useState } from "react";
import { Button, Card, GridItem, Heading, Input, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const CommunitySearch = ({}) => {
  const [searchQuery, setSearchQuery] = useState<any[]>(["", ""]);
  const [query, setQuery] = useState<any[]>([]);
  const navigate = useNavigate();

  const handleClick = (event) => {
    console.log("Box!");

    event.stopPropagation();
    // navigate(`/community/${com.communityname}`);
  };

  const addCriterion = () => {
    setQuery([
      ...query,
      {
        id: query.length + 1,
        type: searchQuery[0],
        value: searchQuery[1],
      },
    ]);
    setSearchQuery(["", ""]);
  };

  const onChangeType = (event) => {
    setSearchQuery([event.target.value, searchQuery[1]]);
  };

  const onChangeValue = (event) => {
    setSearchQuery([searchQuery[0], event.target.value]);
  };

  return (
    <>
      {query.map((val, ind) => (
        <>
          <Text>{val.id}</Text>
          <Text>{val.type}</Text>
          <Text>{val.value}</Text>
        </>
      ))}
      <Input value={searchQuery[0]} onChange={onChangeType} />
      <Input value={searchQuery[1]} onChange={onChangeValue} />

      <Button onClick={addCriterion}>Add</Button>
      <Button onClick={() => console.log(query)}>Search</Button>
    </>
  );
};

export default CommunitySearch;
