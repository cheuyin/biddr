import { Box, Text } from "@chakra-ui/react";
import ChatTab from "./ChatTab";

const ChatPane = ({ chats, onClick }) => {
    return (
        <Box minHeight={"100%"}>
            {chats.map((chat) => (
                <ChatTab
                    key={chat.chatid}
                    chatID={chat.chatid}
                    chatName={chat.chatname}
                    onClick={onClick}
                />
            ))}
        </Box>
    );
};

export default ChatPane;
