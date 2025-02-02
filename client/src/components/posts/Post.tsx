import React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  HStack,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import { DateTime } from 'luxon';
import { useNavigate } from 'react-router-dom';

const Post = ({ post }) => {
  const buttonLabel = post.type === 'auction' ? 'Bid' : 'Donate';
  const navigate = useNavigate();

  const timeAgo = (dateString) => {
    const inputDate = DateTime.fromISO(dateString);
    const timeAgoString = inputDate.toRelative();

    return timeAgoString;
  };

  const active = (dateString) => {
    return DateTime.fromISO(dateString) > DateTime.now();
  };

  const handleClick = (event) => {
    event.stopPropagation();
    navigate(`/${post.type}/${post.postid}`);
  };

  const handleMoneyClick = (event) => {
    // TODO implement modal open
    event.stopPropagation();
  };

  // Template for Post (Card) from https://chakra-ui.com/docs/components/card/usage
  return (
    <Card maxW="xl" mb="4" onClick={handleClick} cursor="pointer">
      <CardBody>
        <Stack mt="0" spacing="3">
          <HStack>
            <Heading overflow="scroll" size="md">
              {post.title}
            </Heading>
            <Text color="gray.500">•</Text>
            <Text color="gray.500">{timeAgo(post.timeposted)}</Text>
          </HStack>
          <Text color="gray.500">{post.postedemail}</Text>
          <Text>{post.text}</Text>
          <Text color="blue.600" fontSize="2xl">
            ${post.sumdonations + post.maxbid}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <HStack spacing="6">
          <Button
            variant="solid"
            colorScheme="blue"
            onClick={handleMoneyClick}
            isDisabled={!active(post.expirytime)}
          >
            {buttonLabel}
          </Button>
          {active(post.expirytime) ? (
            <Text color="blue.500">Ends {timeAgo(post.expirytime)}</Text>
          ) : (
            <Text color="gray.500">Expired</Text>
          )}
        </HStack>
      </CardFooter>
    </Card>
  );
};

export default Post;
