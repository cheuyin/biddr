import { Button, Container, Heading, Text } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

const HomePage = () => {
    const location = useLocation();
    const { auth, setAuth } = useAuth();
    const refresh = useRefreshToken();

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
            <Text>Email: {location.state?.email} </Text>
            <Button onClick={refresh}>Refresh Me!</Button>
        </Container>
    );
};

export default HomePage;
