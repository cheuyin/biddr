import {
    Container,
    Box,
    Heading,
    Input,
    Select,
    FormErrorMessage,
    FormControl,
    FormLabel,
    Button,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

const SignUpForm = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        alert(JSON.stringify(data));
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
                    Sign Up
                </Heading>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl isInvalid={errors.username}>
                        <FormLabel htmlfor="username">Username</FormLabel>
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
                        <FormLabel htmlfor="email">Email</FormLabel>
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

                    <FormControl isInvalid={errors.fullName}>
                        <FormLabel htmlfor="fullName">Full Name</FormLabel>
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
                        <FormLabel htmlfor="password">Password</FormLabel>
                        <Input
                            id="password"
                            type="password"
                            {...register("password", {
                                required: "Please enter a password.",
                                minLength: {
                                    value: 8,
                                    message: "Your password must be at least 8 characters long."
                                },
                                maxLength: {
                                    value: 24,
                                    message: "Your password cannot be more than 24 characters long."
                                }
                            })}
                        />
                        <FormErrorMessage>
                            {errors.password?.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.confirmPassword}>
                        <FormLabel htmlfor="confirmPassword">
                            Confirm Password
                        </FormLabel>
                        <Input
                            id="confirmPassword"
                            type="password"
                            {...register("confirmPassword", {
                                required: "Please confirm your password.",
                                validate: val => {
                                    if (watch("password") !== val) {
                                        return "Your passwords do not match."
                                    }
                                }
                            })}
                        />
                        <FormErrorMessage>
                            {errors.confirmPassword?.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.dateOfBirth}>
                        <FormLabel htmlfor="dateOfBirth">
                            Date of Birth
                        </FormLabel>
                        <Input
                            id="dateOfBirth"
                            type="date"
                            {...register("date")}
                        />
                        <FormErrorMessage>
                            {errors.dateOfBirth?.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.location}>
                        <FormLabel htmlfor="location">Location</FormLabel>
                        <Select placeholder="Select location">
                            <option value="canada">Canada</option>
                            <option value="mexico">Mexico</option>
                            <option value="unitedStates">United States</option>
                        </Select>
                        <FormErrorMessage>
                            {errors.location?.message}
                        </FormErrorMessage>
                    </FormControl>

                    <Button width="100%" mt={4} type="submit">
                        Submit
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default SignUpForm;
