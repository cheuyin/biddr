'use client'

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Input,
  Select,
  Stack,
  useColorModeValue,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
} from '@chakra-ui/react'
import { SmallCloseIcon } from '@chakra-ui/icons'
import useAuth from '../hooks/useAuth'
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import FullScreenSpinner from '../components/FullScreenSpinner';

export default function UserProfileEdit() {
    const { auth } = useAuth();
    const userEmail = auth.email;
    const [user, setUser] = useState({});
    const [locations, setLocations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [usernameErrors, setUsernameErrors] = useState(null);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const bg = useColorModeValue('white', 'gray.700');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const backToProfileHandler = () => {
        navigate("/profile");
    }

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axiosPrivate.get(`/api/users/${userEmail}`);
                await setUser(response.data[0]);
                await setIsLoading(false);
            } catch (err) {
                console.error(err);
            }
        };

        const getLocations = async () => {
            try {
                const response = await axiosPrivate.get("/auth/locations");
                // Set locations state to a sorted list of all the locations
                setLocations(
                    response.data.sort((a, b) =>
                        a.location.localeCompare(b.location)
                    )
                );
            } catch (err) {
                console.error(err);
            }
        };
        getUser();
        getLocations();
    }, [user, usernameErrors]);

    const onSubmit = async (formData) => {
        setIsSubmitting(true);

        const { email, username, fullName, bio } = formData;
        console.log(formData)

        try {
            await axiosPrivate.put(
                `/api/users/${email}`,
                { username, fullName, bio, email }
            );
            alert("Successfully updated user!");
            navigate("/profile");
        } catch (error) {
            console.log(error)
            if(error.response?.status === 403) {
                setUsernameErrors("Username already exists");
            } else {
                alert(error.response?.data?.message);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

  return (
    <>
    {isLoading && <FullScreenSpinner/>}
    {!isLoading && user &&
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
        {user ? `${user.username}'s` : "Your"} Profile
      </Heading>
      <FormControl id="userName">
        <FormLabel>Profile Picture</FormLabel>
        <Stack direction={['column', 'row']} spacing={6}>
          <Center>
            <Avatar size="xl" src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg">
              <AvatarBadge
                as={IconButton}
                size="sm"
                rounded="full"
                top="-10px"
                colorScheme="red"
                aria-label="remove Image"
                icon={<SmallCloseIcon />}
              />
            </Avatar>
          </Center>
          <Center w="full">
            <Button w="full">Change Picture</Button>
          </Center>
        </Stack>
      </FormControl>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl id="email">
            <FormLabel color='gray.500'>Email</FormLabel>
            <Input
            value={user ? user.email: "email"}
            color='gray.500'
            type="text"
            readOnly
            {...register("email")}
            />
        </FormControl>
        <FormControl id="userName" isInvalid={errors.username || usernameErrors}>
            <FormLabel>Username</FormLabel>
            <Input
            defaultValue={user ? user.username : "username"}
            type="text"
            maxLength="32"
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
                {errors.username ? errors.username.message : usernameErrors}
            </FormErrorMessage>
        </FormControl>
        <FormControl id="fullName" isInvalid={errors.fullName}>
            <FormLabel>Full Name</FormLabel>
            <Input
            type="text"
            defaultValue={user ? user.fullname : "fullname"}
            {...register("fullName", {
                required: "Please enter your full name.",
            })}
            />
            <FormErrorMessage>
                {errors.fullName?.message}
            </FormErrorMessage>
        </FormControl>
        <FormControl id="bio" isInvalid={errors.bio}>
            <FormLabel>Bio</FormLabel>
            <Input
            type="text"
            maxLength="256"
            defaultValue={user ? user.bio : ""}
            {...register("bio", {
                maxLength: {
                    value: 256,
                    message: "A bio cannot be more than 256 characters long."
                }
            })}
            />
            <FormErrorMessage>
                {errors.bio?.message}
            </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.location}>
            <FormLabel htmlFor="location">Location</FormLabel>
            <Select
                id="location"
                {...register("location", {
                    required: "Please enter your location.",
                })}
                defaultValue={user.location}>
                {locations.map((location) => (
                    <option
                        key={location.location + location.ageofmajority}
                        value={location.location}>
                        {location.location}
                    </option>
                        ))}
            </Select>
            <FormErrorMessage>
                {errors.location?.message}
            </FormErrorMessage>
        </FormControl>
        <Stack marginTop="25px "spacing={6} direction={['column', 'row']}>
            <Button
            onClick={backToProfileHandler}
            // bg={'red.400'}
            // color={'white'}
            w="full">
            Back To Profile
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
            }}>
            Save Changes
            </Button>
        </Stack>
      </form>
    </Stack>
  </Flex>
    }
    </>
  )
}