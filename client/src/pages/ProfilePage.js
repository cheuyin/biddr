'use client'

import {
  Heading,
  Icon,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react'
import { TfiLocationPin } from 'react-icons/tfi'
import useAuth from '../hooks/useAuth'
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import useLogout from "../hooks/useLogout";
import { Outlet, useNavigate } from "react-router-dom";
import FullScreenSpinner from '../components/FullScreenSpinner';

export default function SocialProfileSimple() {
    const { auth } = useAuth();
    const userEmail = auth.email;
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const axiosPrivate = useAxiosPrivate();
    const bg1 = useColorModeValue('white', 'gray.900');
    const bg2 = useColorModeValue('gray.50', 'gray.800');
    const bg3 = useColorModeValue('gray.700', 'gray.400');
    const logout = useLogout();
    const navigate = useNavigate();

    const signoutHandler = async () => {
        await logout();
        navigate("/auth/signin");
    };

    const editProfileHandler = () => {
      navigate("/profile/edit");
    };

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
        getUser();
    }, [user]);
  return (<>
  {isLoading && <FullScreenSpinner/>}
  {!isLoading &&
    <Center py={6}>
      <Box
        maxW={'50vw'}
        w={'full'}
        bg={bg1}
        boxShadow={'2xl'}
        rounded={'lg'}
        p={6}
        textAlign={'center'}>
        <Avatar
          size={'xl'}
          src={
            'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'
          }
          mb={4}
          pos={'relative'}
          _after={{
            content: '""',
            w: 4,
            h: 4,
            bg: 'green.300',
            border: '2px solid white',
            rounded: 'full',
            pos: 'absolute',
            bottom: 0,
            right: 3,
          }}
        />
        <Heading fontSize={'2xl'} fontFamily={'body'}>
          {user ? user.fullname : "Loading..."}
        </Heading>
        <Text fontWeight={600} color={'gray.500'} mb={4}>
          {user ? `@${user.username}` : "Loading..."}
        </Text>
        <Text
          textAlign={'center'}
          color={bg3}
          px={3}>
            {user ? user.bio : "Loading..."}
        </Text>

        <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
          <Badge
            px={2}
            py={1}
            bg={bg2}
            fontWeight={'400'}>
            Joined: {user ? new Date(user.timejoined).toDateString() : "Loading..."}
          </Badge>
          <Badge
            px={2}
            py={1}
            bg={bg2}
            fontWeight={'400'}>
            <Icon
            as={TfiLocationPin}
          />
          { user ? user.location : "Loading..."}
          </Badge>
        </Stack>

        <Stack mt={8} direction={'row'} spacing={4}>
          <Button
            onClick={signoutHandler}
            flex={1}
            fontSize={'sm'}
            rounded={'full'}
            _focus={{
              bg: 'gray.200',
            }}>
            Log Out
          </Button>
          <Button
            onClick={editProfileHandler}
            flex={1}
            fontSize={'sm'}
            rounded={'full'}
            bg={'blue.400'}
            color={'white'}
            boxShadow={
              '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
            }
            _hover={{
              bg: 'blue.500',
            }}
            _focus={{
              bg: 'blue.500',
            }}>
            Edit Profile
          </Button>
        </Stack>
      </Box>
    </Center>
    }
    <Outlet />
    </>
  )
}