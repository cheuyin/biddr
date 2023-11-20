import { Container, Heading, Text, Button } from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const { auth } = useAuth();
    const logout = useLogout();
    const navigate = useNavigate();

    const signoutHandler = async () => {
        await logout();
        navigate("/auth/signin");
    };

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
            <Button onClick={signoutHandler}>Logout</Button>
        </Container>
    );
};

export default HomePage;
