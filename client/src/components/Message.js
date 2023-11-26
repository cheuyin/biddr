import { Box, Text } from "@chakra-ui/react";

const Message = ({ timesent, fullname, text, sentByUser }) => {
    const date = new Date(timesent);
    const options = {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
        date
    );

    return (
        <Box
            mb={4}
            textAlign={sentByUser ? "right" : "left"}
        >
            <Text color="gray.600">{fullname}</Text>
            <Box
                w="fit-content"
                maxW="50%"
                backgroundColor={sentByUser ? "green.100" : "blue.100" }
                p={4}
                ml={sentByUser ? "auto" : 0}    
                borderRadius={"xl"}
            >
                <Text>{text}</Text>
            </Box>
            <Text fontSize="xs" fontStyle={"italic"}>
                {formattedDate}
            </Text>
        </Box>
    );
};

export default Message;
