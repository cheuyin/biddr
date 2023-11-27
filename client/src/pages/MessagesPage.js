import { useEffect, useState } from "react";
import { Container, Heading, Grid, GridItem } from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import MessagesView from "../components/MessagesView";
import ChatPane from "../components/ChatPane";

const MessagesPage = () => {
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const [chats, setChats] = useState([]);
    const [selectedChatID, setSelectedChatID] = useState(0);

    useEffect(() => {
        const getChatData = async () => {
            if (auth.email) {
                try {
                    const response = await axiosPrivate.get(
                        "/api/chats/users/" + auth.email
                    );
                    console.log(response.data.data);
                    setChats(response.data.data);
                } catch (error) {
                    console.log(error);
                }
            }
        };
        getChatData();
    }, [auth.email, axiosPrivate]);

    const onChatClick = (chatID) => {
        setSelectedChatID(chatID);
    };

    return (
        <Container
            boxShadow={"lg"}
            maxW="100%"
            height={"90vh"}
            backgroundColor={"white"}
            borderRadius={"lg"}
            p={0}
        >
            <Grid
                gridTemplateColumns={"minmax(200px, 1fr) 3fr"}
                width="100%"
                height={"100%"}
                gridGap={4}
                py={4}
            >
                <GridItem borderRight={"2px"} borderColor={"gray.200"} p={3}>
                    <ChatPane
                        chats={chats}
                        onClick={onChatClick}
                        selectedChatID={selectedChatID}
                    />
                </GridItem>
                <GridItem>
                    <MessagesView chatID={selectedChatID} />
                </GridItem>
            </Grid>
        </Container>
    );
};

export default MessagesPage;
