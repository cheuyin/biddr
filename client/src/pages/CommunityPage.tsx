import {
  Button,
  ButtonGroup,
  Container,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import React from "react";

import { useEffect, useState } from "react";
import axios from "../api/axios";
import PostList from "../components/posts/PostList.tsx";
import StatusPopup from "../components/StatusPopup";

const CommunityPage = () => {
  const { name } = useParams();

  const [com, setCommunityInfo] = useState<any>(null);
  const [isEditing, setEditing] = useState(false);
  const [longName, setLn] = useState("");
  const [communityName, setCname] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDesc] = useState("");
  const [popupMessage, setpopUpMessage] = useState<any>({});

  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      const response = await axios.get(`/api/communities/${name}/posts`);
      if (response.data.length !== 0) {
        setPosts(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const navigate = useNavigate();

  const getCommunityInfo = async () => {
    try {
      const response = await axios.get(`/api/communities/${name}`);
      setCommunityInfo(response.data[0]);
      setLn(response.data[0].longname);
      setCname(response.data[0].communityname);
      setEmail(response.data[0].email);
      setDesc(response.data[0].description);
    } catch (err) {
      console.log(err);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  const updateCommunity = async () => {
    try {
      const res = await axios.put(`/api/communities/${name}`, {
        email,
        longName,
        communityName,
        description,
      });
      const response = await axios.get(`/api/communities/${name}`);

      setCommunityInfo(response.data[0]);
      setLn(response.data[0].longname);
      setCname(response.data[0].communityname);
      setEmail(response.data[0].email);
      setDesc(response.data[0].description);
      setpopUpMessage({message: "Successfully updated community information!", isError: false});
    } catch (err) {
      setpopUpMessage({message: err.response.data.error || err.message || err, isError: true});
    } finally {
      setEditing(false);
      setTimeout(() => {
        setpopUpMessage({});
      }, 5000)
    }
  };

  const lnchange = (event) => {
    setLn(event.target.value);
  };

  const descChange = (event) => {
    setDesc(event.target.value);
  };

  const emailChange = (event) => {
    setEmail(event.target.value);
  };

  useEffect(() => {
    getCommunityInfo();
    getPosts();
  }, [name]);

  return (
    <>
      <Button onClick={goBack}>Go back</Button>
      <Container
        maxW="2xl"
        centerContent
        backgroundColor={"teal.100"}
        p={4}
        my={4}
      >
        {com ? (
          !isEditing ? (
            <>
              <Heading>{com.longname}</Heading>
              <Text>{com.communityname}</Text>
              <Text>{com.description}</Text>
              <Text>Managed by {com.email}</Text>
            </>
          ) : (
            <>
              <Input value={longName} onChange={lnchange}></Input>
              <Text>{com.communityname}</Text>
              <Input value={description} onChange={descChange}></Input>
              <Input value={email} onChange={emailChange}></Input>
            </>
          )
        ) : (
          <Text>Loading...</Text>
        )}
        <ButtonGroup>
          <Button onClick={() => setEditing(!isEditing)}>
            {isEditing ? "Cancel" : "Edit"}
          </Button>
          {isEditing ? <Button onClick={updateCommunity}>Save</Button> : ""}
        </ButtonGroup>
      </Container>
      <PostList posts={posts} />
      {popupMessage.message && <StatusPopup message={popupMessage.message} isError={popupMessage.isError}/>}
    </>
  );
};

export default CommunityPage;
