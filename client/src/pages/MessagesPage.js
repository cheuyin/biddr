import { useEffect, useState } from "react";
import { Container, Heading, Text } from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const MessagesPage = () => {
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const [chatNames, setChatNames] = useState([]);

    console.log(auth.email);

    useEffect(() => {
        const getChatData = async () => {
            if (auth.email) {
                try {
                    const response = await axiosPrivate.get(
                        "/api/chats/users/" + auth.email
                    );
                    setChatNames(response.data.data);
                } catch (error) {
                    console.log(error);
                }
            }
        };
        getChatData();
    }, [auth.email, axiosPrivate]);

    return (
        <Container maxW="100%" height={'90vh'} centerContent backgroundColor={"teal.100"}>
            <Heading>Chats </Heading>
            {chatNames.map((chat) => (
                <Text key={chat.chatid}>{chat.chatname}</Text>
            ))}
        </Container>
    );
};

export default MessagesPage;
