import { Box, Heading } from "@chakra-ui/react";
import ChatTab from "./ChatTab";

const ChatPane = ({ chats, onClick, selectedChatID, onChatDelete }) => {
    return (
        <Box height={"80vh"} overflowY='auto' px={4} borderRadius={12}>
            <Heading
                textAlign="center"
                fontSize={"2xl"}
                color="gray.400"
                marginBottom={4}
            >
                Conversations
            </Heading>
            {/* <Center my={6}>
                <Button mx={"auto"}>
                    Create Group Chat
                </Button>
            </Center> */}
            {chats.map((chat) => (
                <ChatTab
                    key={chat.chatid}
                    chatID={chat.chatid}
                    chatName={chat.chatname}
                    onClick={onClick}
                    selected={selectedChatID === chat.chatid}
                    onChatDelete={onChatDelete}
                />
            ))}
        </Box>
    );
};

export default ChatPane;
