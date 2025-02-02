import { Flex, Text } from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

const ChatTab = ({ chatName, chatID, onClick, selected, onChatDelete }) => {
  return (
    <Flex
      backgroundColor={selected ? 'gray.700' : 'white'}
      color={selected ? 'white' : 'gray.700'}
      p={4}
      mb={4}
      w={'100%'}
      shadow={'md'}
      borderRadius={'xl'}
      onClick={() => onClick(chatID)}
      _hover={{ cursor: 'pointer', shadow: 'lg' }}
      justifyContent={'space-between'}
      alignItems={'center'}
    >
      <Text>{chatName}</Text>
      <IconButton onClick={() => onChatDelete(chatID)} icon={<DeleteIcon />} />
    </Flex>
  );
};

export default ChatTab;
