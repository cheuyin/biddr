import { Container, Flex, Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

// This is the page wrapper for the sign in / sign up forms.
// Essentially, all it does is center the forms in the middle of the page
const AuthPage = () => {
    return (
        <Container maxW="100%" h="100vh">
            <Flex
                justifyContent="center"
                alignItems="center"
                height="100vh"
            >
                <Box
                    border="1px"
                    p={4}
                    borderRadius="md"
                    boxShadow="sm"
                    borderColor={"gray.200"}
                    minWidth={"300px"}
                    width="30%"
                >
                    <Outlet />
                </Box>
            </Flex>
        </Container>
    );
};

export default AuthPage;
