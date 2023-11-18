import { Container, Heading } from "@chakra-ui/react";

// This is a test to see whether protected routes are implemented properly

const TestPrivatePage = () => {
    
    return (
        <Container>
            <Heading>
                This is a private page! Only authenticated users can see this.
            </Heading>
        </Container>
    );
};

export default TestPrivatePage;
