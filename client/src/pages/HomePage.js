import {
  Container,
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
  Checkbox,
} from '@chakra-ui/react';
import useAuth from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import axios, { axiosPrivate } from '../api/axios';
import PostList from '../components/posts/PostList.tsx';
import StatusPopup from '../components/StatusPopup';

const HomePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { auth } = useAuth();

  const [posts, setPosts] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [selectedCommunities, setSelectedCommunities] = useState({});
  const [emptyHomepage, setEmptyHomepage] = useState(true);
  const [popupMessage, setPopupMessage] = useState(false);

  const getPosts = async () => {
    try {
      const response = await axios.get(
        `/api/users/${auth.email}/subscribed-posts`,
      );
      if (response.data.length !== 0) {
        setEmptyHomepage(false);
        setPosts(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getCommunities = async () => {
    try {
      const response = await axios.get(`/api/users/${auth.email}/communities`);
      if (response.data.length !== 0) {
        setCommunities(response.data);
        let selected = {};
        response.data.map((community) => {
          selected[community.communityname] = true;
        });
        setSelectedCommunities(selected);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleFilterPostsByCommunity = async () => {
    try {
      const selected = Object.keys(selectedCommunities).filter(
        (community) => selectedCommunities[community] === true,
      );

      const response = await axiosPrivate.get(
        `/api/users/${auth.email}/filtered-posts`,
        {
          params: selected,
        },
      );
      setEmptyHomepage(response.data.length === 0);
      setPosts(response.data);
      setPopupMessage({
        message: 'Successfully filtered posts!',
        isError: false,
      });
    } catch (error) {
      setPopupMessage({ message: error.response?.data?.error, isError: true });
    } finally {
      setTimeout(() => {
        setPopupMessage(false);
      }, 5000);
    }
  };

  useEffect(() => {
    getCommunities();
    getPosts();
  }, [auth.email]);

  return (
    <>
      <Container maxW="2xl" centerContent p={4} my={4}>
        <Heading>Home Page</Heading>
        <Button mt={4} onClick={onOpen} colorScheme="blue" textColor={'white'}>
          Filter Posts
        </Button>
      </Container>
      <PostList posts={posts} />
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        closeOnOverlayClick={false}
        isCentered
      >
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
                      <Checkbox
                        isChecked={
                          selectedCommunities[com.communityname] === true
                        }
                        key={com.communityname}
                        onChange={(e) => {
                          setSelectedCommunities((prevState) => {
                            const newState = { ...prevState };
                            newState[com.communityname] = e.target.checked;
                            return newState;
                          });
                        }}
                      >
                        {com.communityname}
                      </Checkbox>
                    ))}
                  </Flex>
                </CheckboxGroup>
              </Box>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={handleFilterPostsByCommunity}
              colorScheme="blue"
              mr={3}
            >
              Filter
            </Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {popupMessage && (
        <StatusPopup
          message={popupMessage.message}
          isError={popupMessage.isError}
        />
      )}
      {emptyHomepage && (
        <Container maxW="2xl" centerContent p={4} my={4}>
          <Heading color={'grey'}>There are no posts to display :(</Heading>
          <Text color={'grey'}>
            Join a Community or Filter Communities To See Posts
          </Text>
        </Container>
      )}
    </>
  );
};

export default HomePage;
