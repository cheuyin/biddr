import { Box, Text } from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";

const Message = ({ timesent, email, fullname, text }) => {
    const { auth } = useAuth();

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
        <Box mb={4}>
            <Text color="gray.600">{fullname}</Text>
            <Box
                w="max-content"
                maxW="50%"
                backgroundColor={"blue.200"}
                p={4}
                borderRadius={'xl'}
            >
                <Text>{text}</Text>
            </Box>
            <Text fontSize='xs' fontStyle={'italic'}>{formattedDate}</Text>
        </Box>
    );
};

export default Message;
