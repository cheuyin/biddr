import {Container, Heading, Text} from "@chakra-ui/react"
import { useLocation } from "react-router-dom";

const HomePage = () => {
    const location = useLocation();

    return (
        <Container maxW='2xl' centerContent backgroundColor={'teal.100'} p={4} my={4}>
            <Heading>Home Page</Heading>
            <Text>If You're Reading This, You're Authenticated. </Text>
            <Text>Email: {location.state?.email} </Text>
        </Container>
    );
};

export default HomePage;
