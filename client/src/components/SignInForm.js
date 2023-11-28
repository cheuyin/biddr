import {
    Heading,
    Input,
    FormErrorMessage,
    FormControl,
    FormLabel,
    Button,
    Link,
    Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import StatusPopup from "./StatusPopup";

const SignInForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [popupMessage, setpopUpMessage] = useState({});
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();

    const onSubmit = async ({ email, password }) => {
        setIsSubmitting(true);

        try {
            const response = await axiosPrivate.post("/auth/signin", {
                email,
                password,
            });

            if (!response.data.accessToken) {
                throw new Error("Access token not received");
            }

            setAuth({
                accessToken: response.data.accessToken,
            });

            navigate("/");
        } catch (error) {
            console.log(error);
            setpopUpMessage({message: error.response?.data?.error || error.message || error, isError: true});
        } finally {
            setIsSubmitting(false);
            setTimeout(() => {
                setpopUpMessage({})
            }, 5000);
        }
    };

    return (
        <>
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
                                message: "Please enter a valid email address.",
                            },
                            maxLength: {
                                value: 256,
                                message:
                                    "Your email cannot be more than 256 characters long.",
                            },
                        })}
                    />
                    <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
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

                <Text my={3}>
                    Don't have an account?{" "}
                    <Link color="blue.400" href="/auth/signup">
                        Sign Up
                    </Link>
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
            {popupMessage.message && <StatusPopup message={popupMessage.message} isError={popupMessage.isError} />}
        </>
    );
};

export default SignInForm;
