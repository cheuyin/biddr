import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Box, Text, Input, Flex } from "@chakra-ui/react";
import Message from "./Message";
import useAuth from "../hooks/useAuth";

const MessagesView = ({ chatID }) => {
    const axiosPrivate = useAxiosPrivate();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const { auth } = useAuth();

    useEffect(() => {
        fetchMessages();
    }, [chatID, axiosPrivate]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosPrivate.post("/api/chats/" + chatID + "/messages", {
                email: auth.email,
                text: newMessage,
            });
            await fetchMessages();
            setNewMessage("");
        } catch (error) {
            alert("Error! Message Not Sent.");
        }
    };

    return (
        <Flex
            minHeight="100%"
            p={4}
            backgroundColor={"orange.200"}
            flexDirection={"column"}
        >
            <Box flexGrow={1}>
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

            <Box flexGrow={0} backgroundColor={"white"} w={"80%"} mx="auto">
                <form onSubmit={handleSubmit}>
                    <Input
                        name="newMessage"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a Message..."
                        size={"lg"}
                    />
                </form>
            </Box>
        </Flex>
    );
};

export default MessagesView;
