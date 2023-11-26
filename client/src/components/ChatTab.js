import { Box, Text } from "@chakra-ui/react";

const ChatTab = ({ chatName, chatID, onClick, selected }) => {
    return (
        <Box
            backgroundColor={selected ? "gray.700" : "white"}
            color={selected ? "white" : "gray.700"}
            p={4}
            mb={4}
            w={"100%"}
            shadow={"md"}
            borderRadius={"xl"}
            onClick={() => onClick(chatID)}
            _hover={{ cursor: "pointer", shadow: "lg"}}
        >
            <Text>{chatName}</Text>
        </Box>
    );
};

export default ChatTab;
