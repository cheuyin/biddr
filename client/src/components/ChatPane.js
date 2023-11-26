import { Box, Text, Heading } from "@chakra-ui/react";
import ChatTab from "./ChatTab";

const ChatPane = ({ chats, onClick, selectedChatID }) => {
    return (
        <Box height={"100%"} px={4} borderRadius={12}>
            <Heading
                textAlign="center"
                fontSize={"2xl"}
                pb={10}
                color="gray.400"
            >
                Conversations
            </Heading>
            {chats.map((chat) => (
                <ChatTab
                    key={chat.chatid}
                    chatID={chat.chatid}
                    chatName={chat.chatname}
                    onClick={onClick}
                    selected={selectedChatID === chat.chatid}
                />
            ))}
        </Box>
    );
};

export default ChatPane;
