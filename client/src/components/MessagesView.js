import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Box, Text, Input, Flex } from "@chakra-ui/react";
import Message from "./Message";
import useAuth from "../hooks/useAuth";
import StatusPopup from "./StatusPopup";

const MessagesView = ({ chatID }) => {
    const axiosPrivate = useAxiosPrivate();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [popupMessage, setpopUpMessage] = useState({});
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
            console.log(error);
            setpopUpMessage({message: "Message not sent.", isError: true});
        } finally {
            setTimeout(() => {
                setpopUpMessage({});
            }, 5000);
        }
    };

    return (
        <Flex
            height='85vh'
            p={4}
            flexDirection={'column'}
            justifyContent={'space-between'}
        >
            <Box flex={1} overflowY={'auto'}>
                {messages.map((message) => (
                    <Message
                        key={message.messageid}
                        timesent={message.timesent}
                        text={message.text}
                        email={message.email}
                        fullname={message.fullname}
                        sentByUser={auth.email === message.email}
                    />
                ))}
            </Box>

            <Box backgroundColor={"white"} w={"80%"} mt={4} mx="auto" borderRadius="lg" boxShadow={'md'}>
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
            {popupMessage.message && <StatusPopup message={popupMessage.message} isError={popupMessage.isError}/>}
        </Flex>
    );
};

export default MessagesView;
