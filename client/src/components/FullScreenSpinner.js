import { Container, Spinner, Flex } from "@chakra-ui/react";

// This component is just a full screen spinner that you show for loading purposes.

const FullScreenSpinner = () => {
    return (
        <Container maxWidth={"100%"} height="100vh" centerContent>
            <Flex justifyContent="center" alignItems="center" height="100vh">
                <Spinner thickness="4px" emptyColor="gray.200" size="xl" />
            </Flex>
        </Container>
    );
};

export default FullScreenSpinner;
