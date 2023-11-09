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
            <Box border="1px" p={4} borderColor={"gray.200"}>
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
                                    value: 5,
                                    message: "Min length is 5",
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
                                required: "An email is required.",
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
