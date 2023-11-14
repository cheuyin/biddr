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
import { useState, useContext } from "react";

import AuthContext from "../context/AuthProvider";
import { signIn } from "../api/auth";

const SignInForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const { auth, setAuth } = useContext(AuthContext);

    const onSubmit = async ({ email, password }) => {
        setIsSubmitting(true);

        try {
            const { accessToken } = await signIn(email, password);
            if (!accessToken) {
                throw new Error("Access token not recieved");
            }
            setAuth({
                email,
                password,
                accessToken,
            });
        } catch (error) {
            alert(error.message || error);
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
                <Text>{"LOGGED IN USER: " + auth.email}</Text>
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
                            type="password"
                            {...register("password", {
                                required: "Please enter your password.",
                            })}
                        />
                        <FormErrorMessage>
                            {errors.password?.message}
                        </FormErrorMessage>
                    </FormControl>

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
