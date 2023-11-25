import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Box, Text } from "@chakra-ui/react";
import Message from "./Message";

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
        <Box minHeight="100%" p={4}>
            {messages.map((message) => (
                <Message
                    key={message.messageid}
                    timesent={message.timesent}
                    text={message.text}
                    email={message.email}
                    fullname={message.fullname}
                />
            ))}
        </Box>
    );
};

export default MessagesView;
