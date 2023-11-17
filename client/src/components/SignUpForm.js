import {
    Heading,
    Input,
    Select,
    FormErrorMessage,
    FormControl,
    FormLabel,
    Button,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { BASE_URL } from "../services/constants";

const API_URL = BASE_URL + "/api/users";

const SignUpForm = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (formData) => {
        setIsSubmitting(true);

        const { username, email, fullName, password, dateOfBirth, location } =
            formData;

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    email,
                    fullName,
                    password,
                    dateOfBirth,
                    location,
                }),
            });
            const responseData = await response.json();
            if (response.status === 200) {
                console.log(responseData);
            } else {
                throw new Error(responseData.error);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Heading as="h1" size="lg" m={4} textAlign={"center"}>
                Sign Up
            </Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={errors.username}>
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <Input
                        id="username"
                        {...register("username", {
                            required: "A username is required.",
                            minLength: {
                                value: 3,
                                message:
                                    "A username must be at least 3 characters long.",
                            },
                            maxLength: {
                                value: 32,
                                message:
                                    "A username must be at most 32 characters long.",
                            },
                        })}
                    />
                    <FormErrorMessage>
                        {errors.username?.message}
                    </FormErrorMessage>
                </FormControl>

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

                <FormControl isInvalid={errors.fullName}>
                    <FormLabel htmlFor="fullName">Full Name</FormLabel>
                    <Input
                        id="fullName"
                        {...register("fullName", {
                            required: "Please enter your full name.",
                        })}
                    />
                    <FormErrorMessage>
                        {errors.fullName?.message}
                    </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.password}>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input
                        id="password"
                        type="password"
                        {...register("password", {
                            required: "Please enter a password.",
                            minLength: {
                                value: 8,
                                message:
                                    "Your password must be at least 8 characters long.",
                            },
                            maxLength: {
                                value: 24,
                                message:
                                    "Your password cannot be more than 24 characters long.",
                            },
                        })}
                    />
                    <FormErrorMessage>
                        {errors.password?.message}
                    </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.confirmPassword}>
                    <FormLabel htmlFor="confirmPassword">
                        Confirm Password
                    </FormLabel>
                    <Input
                        id="confirmPassword"
                        type="password"
                        {...register("confirmPassword", {
                            required: "Please confirm your password.",
                            validate: (val) => {
                                if (watch("password") !== val) {
                                    return "Your passwords do not match.";
                                }
                            },
                        })}
                    />
                    <FormErrorMessage>
                        {errors.confirmPassword?.message}
                    </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.dateOfBirth}>
                    <FormLabel htmlFor="dateOfBirth">Date of Birth</FormLabel>
                    <Input
                        id="dateOfBirth"
                        type="date"
                        {...register("dateOfBirth", {
                            required: "Please enter your date of birth.",
                        })}
                    />
                    <FormErrorMessage>
                        {errors.dateOfBirth?.message}
                    </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.location}>
                    <FormLabel htmlFor="location">Location</FormLabel>
                    <Select
                        id="location"
                        {...register("location", {
                            required: "Please enter your location.",
                        })}
                        placeholder="Select location"
                    >
                        <option value="canada">Canada</option>
                        <option value="mexico">Mexico</option>
                        <option value="unitedStates">United States</option>
                    </Select>
                    <FormErrorMessage>
                        {errors.location?.message}
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
        </>
    );
};

export default SignUpForm;
