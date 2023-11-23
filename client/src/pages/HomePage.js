import { Container, Heading, Text, Button, Card } from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import PostList from "../components/posts/PostList.tsx";

const HomePage = () => {
  const { auth } = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();

  const signoutHandler = async () => {
    await logout();
    navigate("/auth/signin");
  };

  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      const response = await axios.get(
        `/api/users/${auth.email}/subscribed-posts`
      );
      setPosts(response.data);
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
        <Heading>Home Page</Heading>
        <Text>If You're Reading This, You're Authenticated. </Text>
        <Text>Email: {auth.email} </Text>
        <Button onClick={signoutHandler}>Logout</Button>
      </Container>
      <PostList posts={posts} />
    </>
  );
};

export default HomePage;
