import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Box, Text } from "@chakra-ui/react";

const MessagesView = ({ chatID }) => {
    const axiosPrivate = useAxiosPrivate();
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axiosPrivate.get(
                    "/api/chats/" + chatID + "/messages"
                );
                setMessages(response.data.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchMessages();
    }, [chatID, axiosPrivate]);

    return (
        <Box minHeight="100%" backgroundColor={"yellow.200"}>
            {messages.map((message) => (
                <Text key={message.messageid}>{message.text}</Text>
            ))}
        </Box>
    );
};

export default MessagesView;
