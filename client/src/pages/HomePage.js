import { Container, Heading, Text } from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";

const HomePage = () => {
    const { auth } = useAuth();

    return (
        <Container
            maxW="2xl"
            centerContent
            backgroundColor={"teal.100"}
            p={4}
            my={4}
        >
            <Heading>Home Page</Heading>
            <Text>If You're Reading This, You're Authenticated. </Text>
            <Text>Email: {auth.email} </Text>
        </Container>
    );
};

export default HomePage;
