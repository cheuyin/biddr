import { Container, Grid, Heading, Text } from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import Community from "../components/communities/Community.tsx";
import CommunitySearch from "../components/communities/CommunitySearch.tsx";

const CommunitiesPage = () => {
  const { auth } = useAuth();

  const [communities, setCommunities] = useState([]);

  const getPosts = async () => {
    try {
      const response = await axios.get(`/api/users/${auth.email}/communities`);
      if (response.data.length !== 0) {
        setCommunities(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getPosts();
  }, [auth.email]);

  return (
    <>
      <Container
        maxW="2xl"
        centerContent
        backgroundColor={"teal.100"}
        p={4}
        my={4}
      >
        <Heading>Communities Page</Heading>
        <Text>If You're Reading This, You're Authenticated. </Text>
        <Text>Email: {auth.email} </Text>
      </Container>
      <Grid templateColumns="repeat(5, 1fr)" gap={6}>
        {communities.map((com, index) => (
          <Community row={index} com={com} />
        ))}
      </Grid>
      <Container
        maxW="2xl"
        centerContent
        backgroundColor={"gray.100"}
        p={4}
        my={4}
      >
        <Heading>Search Community Section</Heading>
        <Text>Build a select query</Text>
        <Text></Text>
      </Container>
      <CommunitySearch />
    </>
  );
};

export default CommunitiesPage;
