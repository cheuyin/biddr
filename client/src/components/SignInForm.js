import {
    Container,
    Box,
    Heading,
    Input,
    FormErrorMessage,
    FormControl,
    FormLabel,
    Button,
    Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useState } from "react";

const BASE_URL = "http://localhost:8000/";

const SignInForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const onSubmit = async ({ email, password }) => {
        setIsSubmitting(true);

        try {
            const response = await fetch(BASE_URL + "auth/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });
            const responseData = await response.json();
            if (responseData.error) {
                throw new Error(responseData.error);
            } else {
                alert("Authorized!");
            }
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Container maxW="md" mt={10}>
            <Box
                border="1px"
                p={4}
                borderRadius="md"
                boxShadow="sm"
                borderColor={"gray.200"}
            >
                <Heading as="h1" size="lg" m={4} textAlign={"center"}>
                    Sign In
                </Heading>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl isInvalid={errors.email}>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <Input
                            id="email"
                            {...register("email", {
                                required: "Please enter your email.",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message:
                                        "Please enter a valid email address.",
                                },
                                maxLength: {
                                    value: 256,
                                    message:
                                        "Your email cannot be more than 256 characters long.",
                                },
                            })}
                        />
                        <FormErrorMessage>
                            {errors.email?.message}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.password}>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Input
                            id="password"
                            {...register("password", {
                                required: "Please enter your password.",
                            })}
                        />
                        <FormErrorMessage>
                            {errors.password?.message}
                        </FormErrorMessage>
                    </FormControl>

                    <Text color="tomato" m={3} textAlign={"center"}>
                        {errorMessage}
                    </Text>

                    <Button
                        isLoading={isSubmitting}
                        loadingText="Submitting"
                        spinnerPlacement="start"
                        width="100%"
                        mt={4}
                        type="submit"
                    >
                        Submit
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default SignInForm;
