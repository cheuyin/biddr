'use client'

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Stack,
  useColorModeValue,
  Heading,
} from '@chakra-ui/react'
import useAuth from '../hooks/useAuth'
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function EditPassword() {
    const { auth } = useAuth();
    const userEmail = auth.email;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const bg = useColorModeValue('white', 'gray.700');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const backToEditProfileHandler = () => {
        navigate("/profile/edit");
    }

    const onSubmit = async (formData) => {
        setIsSubmitting(true);

        const { password } = formData;
        const email = userEmail;

        try {
            await axiosPrivate.put(
                `/api/users/${userEmail}/password`,
                { password, email }
            );
            alert("Successfully updated user password!");
            navigate("/profile/edit");
        } catch (error) {
            console.log(error)
            if(error.response?.status === 403) {
            } else {
                alert(error.response?.data?.error);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

  return (
    <Flex
    minH={'100vh'}
    align={'center'}
    justify={'center'}>
    <Stack
      spacing={4}
      w={'full'}
      maxW={'md'}
      bg={bg}
      rounded={'xl'}
      boxShadow={'lg'}
      p={6}
      my={12}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
            Change Password
        </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl id="password" isInvalid={errors.password}>
            <FormLabel>New Password</FormLabel>
            <Input
            type="password"
            placeholder='Enter new password here...'
            {...register("password", {
                required: "Please enter a new password.",
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
        <FormControl id="confirmPassword" isInvalid={errors.confirmPassword}>
            <FormLabel>Confirm New Password</FormLabel>
            <Input
            type="password"
            placeholder='Confirm new password here...'
            {...register("confirmPassword", {
                required: "Please confirm new password.",
                validate: {
                    validateSame: (value, formValues) => value === formValues.password || "Passwords do not match"
                },
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
                {errors.confirmPassword?.message}
            </FormErrorMessage>
        </FormControl>
        <Stack marginTop="25px "spacing={6} direction={['column', 'row']}>
            <Button
            onClick={backToEditProfileHandler}
            // bg={'red.400'}
            // color={'white'}
            w="full">
            Back To Edit Profile
            </Button>
            <Button
            bg={'blue.400'}
            color={'white'}
            w="full"
            isLoading={isSubmitting}
            loadingText="Submitting"
            spinnerPlacement="start"
            type="submit"
            _hover={{
                bg: 'blue.500',
            }}
            boxShadow={
                '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
              }>
            Change Password
            </Button>
        </Stack>
      </form>
    </Stack>
  </Flex>
  )
}