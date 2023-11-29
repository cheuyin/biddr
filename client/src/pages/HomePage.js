import { Container, 
  Heading, 
  Text, 
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box, 
  useDisclosure,
  CheckboxGroup,
  Flex,
  Grid,
  Checkbox, } from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import axios, { axiosPrivate } from "../api/axios";
import PostList from "../components/posts/PostList.tsx";
import FullScreenSpinner from "../components/FullScreenSpinner";
import Community from "../components/communities/Community.tsx";

const HomePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { auth } = useAuth();

  const [posts, setPosts] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [selectedCommunities, setSelectedCommunities] = useState({});

  const getPosts = async () => {
    try {
      const response = await axios.get(
        `/api/users/${auth.email}/subscribed-posts`
      );
      if (response.data.length !== 0) {
        setPosts(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getCommunities = async () => {
    try {
      const response = await axios.get(`/api/users/${auth.email}/communities`);
      if(response.data.length !== 0) {
        setCommunities(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleFilterPostsByCommunity = async () => {
    try {
      const selected = Object.keys(selectedCommunities).filter(
        (community) => selectedCommunities[community] === true
      );

      const response = await axiosPrivate.get(
        `/api/users/${auth.email}/filtered-posts`,
        {
          params: selected,
        }
      );
      setPosts(response.data);
    } catch(error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCommunities();
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
        <Heading>Home Page</Heading>
        <Text>If You're Reading This, You're Authenticated. </Text>
        <Text>Email: {auth.email} </Text>
        <Button onClick={onOpen}>Filter Posts</Button>
      </Container>
      <PostList posts={posts} />
      <Modal onClose={onClose} isOpen={isOpen} closeOnOverlayClick={false} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Filter Posts By Community</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Box>
                <CheckboxGroup flexDirection="column" gap={2}>
                  <Flex flexDirection="column" gap={2}>
                  {communities.map((com, index) => (
                  <Checkbox key={com.communityname} onChange={(e) => {
                    setSelectedCommunities((prevState) => {
                      const newState = {...prevState}
                      newState[com.communityname] = e.target.checked;
                      return newState;
                    });
                    }}>
                    {com.communityname}
                  </Checkbox>
                ))}
                  </Flex>
                </CheckboxGroup>
              </Box>
            </Box>
          </ModalBody>
          <ModalFooter>
          <Button onClick={handleFilterPostsByCommunity} colorScheme='blue' mr={3}>
              Filter
            </Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default HomePage;
