import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CloseButton,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import Community from "./Community.tsx";
import axios from "../../api/axios.js";
import StatusPopup from "../StatusPopup.js";

const CommunitySearch = ({ joined, reload, email }) => {
  const [searchQuery, setSearchQuery] = useState<any[]>([
    "and",
    "communityName",
    "",
  ]);
  const [query, setQuery] = useState<any[]>([]);
  const [communities, setCommunities] = useState([]);
  const [popupMessage, setpopUpMessage] = useState<any>(false);

  const getPosts = async () => {
    try {
      const response = await axios.post(`/api/communities/search`, {
        queries: query,
      });
      setCommunities(response.data);
      setpopUpMessage({ message: "Successful search", isError: false });
    } catch (err) {
      setpopUpMessage({
        message: err.response?.data?.error || err.message || err,
        isError: true,
      });
    } finally {
      setTimeout(() => {
        setpopUpMessage(false);
      }, 5000);
    }
  };

  const addCriterion = () => {
    setQuery([
      ...query,
      {
        id: query.length === 0 ? 1 : Math.max(...query.map((q) => q.id)) + 1,
        type: searchQuery[0],
        attribute: searchQuery[1],
        value: searchQuery[2],
      },
    ]);
    setSearchQuery(["and", "communityName", ""]);
  };

  const onChangeType = (event) => {
    setSearchQuery([event.target.value, searchQuery[1], searchQuery[2]]);
  };

  const onChangeAttribute = (event) => {
    setSearchQuery([searchQuery[0], event.target.value, searchQuery[2]]);
  };

  const onChangeValue = (event) => {
    setSearchQuery([searchQuery[0], searchQuery[1], event.target.value]);
  };

  const deleteQuery = (id) => {
    setQuery(query.filter((q) => q.id !== id));
  };

  return (
    <>
      <Box>
        {query.length === 0 ? (
          ""
        ) : (
          <Box p="4" bg="gray.50">
            <Heading pb="8" as="h3" size="sm" color="gray.800">
              Search Criteria
            </Heading>
            {query.map((val, ind) => (
              <>
                <Box pt="0" bg="">
                  {ind === 0 ? (
                    ""
                  ) : (
                    <Text py="2">{val.type.toUpperCase()}</Text>
                  )}
                  <Flex>
                    {val.attribute === "email" ? (
                      <Text>
                        <b>{val.value}</b> manages the community
                      </Text>
                    ) : val.attribute === "communityName" ? (
                      <Text>
                        <b>{val.value}</b> is the community's short name
                      </Text>
                    ) : val.attribute === "description" ? (
                      <Text>
                        <b>{val.value}</b> is the community's description
                      </Text>
                    ) : (
                      <Text>
                        <b>{val.value}</b> is the community's full name
                      </Text>
                    )}
                    <CloseButton
                      size="sm"
                      onClick={() => deleteQuery(val.id)}
                    />
                  </Flex>
                </Box>
              </>
            ))}
          </Box>
        )}
        <Flex
          align="center"
          justify="space-between"
          gap="4"
          bg="gray.200"
          p="4"
        >
          {query.length === 0 ? (
            <Text width="10%">Add criteria: </Text>
          ) : (
            <Select width="10%" value={searchQuery[0]} onChange={onChangeType}>
              <option value="and">AND</option>
              <option value="or">OR</option>
            </Select>
          )}
          <Select
            width="20%"
            value={searchQuery[1]}
            onChange={onChangeAttribute}
          >
            <option value="communityName">Community name</option>
            <option value="email">Manager's email</option>
            <option value="longName">Community full name</option>
            <option value="description">Community's description</option>
          </Select>
          <Text width="10%" textAlign="center">
            is equal to
          </Text>
          <Input width="50%" value={searchQuery[2]} onChange={onChangeValue} />
          <Button width="8%" onClick={addCriterion} colorScheme="gray">
            Add
          </Button>
        </Flex>
        <Button mt="4" onClick={getPosts} colorScheme="blue">
          Search
        </Button>
        <Divider my="4" />
        <Grid templateColumns="repeat(5, 1fr)" gap={6}>
          {communities.map((com: any, index) => (
            <Community
              key={index}
              com={com}
              joined={joined.includes(com.communityname)}
              reload={reload}
              email={email}
            />
          ))}
        </Grid>
      </Box>
      {popupMessage && (
        <StatusPopup
          message={popupMessage.message}
          isError={popupMessage.isError}
        />
      )}
    </>
  );
};

export default CommunitySearch;
