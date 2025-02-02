import React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  GridItem,
  Heading,
  Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';

const Community = ({ com, joined, reload, email }) => {
  const navigate = useNavigate();

  const handleClick = (event) => {
    event.stopPropagation();
    navigate(`/community/${com.communityname}`);
  };

  const handleJoinLeave = async (event) => {
    event.stopPropagation();
    if (joined) {
      try {
        await axios.post(`/api/communities/leave`, {
          email: email,
          communityName: com.communityname,
        });
        reload();
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await axios.post(`/api/communities/join`, {
          email: email,
          communityName: com.communityname,
        });
        reload();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Card maxW="xl" mb="2" p="2" onClick={handleClick} cursor="pointer">
      <CardBody>
        <GridItem w="100%" h="150" overflow="scroll">
          <Heading size="md">{com.communityname}</Heading>
          <Text>{com.email}</Text>
          <Text>{com.longname}</Text>
          <Text>{com.description}</Text>
        </GridItem>
      </CardBody>
      <Divider />
      <CardFooter>
        <Button
          colorScheme={joined ? 'gray' : 'blue'}
          onClick={handleJoinLeave}
        >
          {joined ? 'Leave' : 'Join'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Community;
