import { Box, Text } from "@chakra-ui/react";

const ChatTab = ({ chatName, chatID, onClick }) => {
    return (
        <Box
            backgroundColor={"orange.50"}
            p={4}
            mb={4}
            w={"100%"}
            shadow={"md"}
            borderRadius={"3"}
            onClick={() => onClick(chatID)}
            _hover={{ cursor: "pointer", backgroundColor: "gray.100" }}
        >
            <Text>{chatName}</Text>
        </Box>
    );
};

export default ChatTab;
