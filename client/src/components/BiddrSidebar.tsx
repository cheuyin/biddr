// Template for sidebar from: https://chakra-templates.dev/navigation/sidebar
'use client'

import React, { ReactNode } from 'react'
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  keyframes,
} from '@chakra-ui/react'
import {
  FiHome,
  FiMenu,
  FiMessageCircle,
  FiDollarSign,
  FiUsers,
  FiUser,
} from 'react-icons/fi'
import { IconType } from 'react-icons'
import { ReactText } from 'react'

interface LinkItemProps {
  name: string
  pageUrl: string
  icon: IconType
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', pageUrl: '/home', icon: FiHome },
  { name: 'My Communities', pageUrl: '/communities', icon: FiUsers },
  { name: 'My Wallets', pageUrl: '/wallets', icon: FiDollarSign },
  { name: 'Messages', pageUrl: '/messages', icon: FiMessageCircle },
]

export default function BiddrSidebar({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {/* CONTENT GOES IN HERE */}
        {children}
      </Box>
    </Box>
  )
}

interface SidebarProps extends BoxProps {
  onClose: () => void
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const animation = keyframes`
    to {
      background-position: 200% center;
    }
  `
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between" >
        <Text
          fontSize="3xl"
          fontFamily="inter"
          fontWeight="bold"
          backgroundSize= "200% auto"
          _hover={{
            bgGradient: "linear(to-l, #B2F5EA, cyan.400)",
            bgClip: "text",
            animation: `${animation} 1s linear infinite`
          }}>
          biddr.
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} pageUrl={link.pageUrl} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
      <Box
        bg={useColorModeValue('white', 'gray.900')}
        borderTop="1px"
        borderTopColor={useColorModeValue('gray.200', 'gray.700')}
        borderRight="1px"
        borderRightColor={useColorModeValue('gray.200', 'gray.700')}
        w={{ base: 'full', md: 60 }}
        pos="absolute"
        bottom="0px"
        minH="5vh">
          <NavItem key='My Profile' pageUrl='/profile' icon={FiUser}>My Profile</NavItem>
      </Box>
    </Box>
  )
}

interface NavItemProps extends FlexProps {
  pageUrl: string
  icon: IconType
  children: ReactText
}
const NavItem = ({ pageUrl, icon, children, ...rest }: NavItemProps) => {
  return (
    <Box
      as="a"
      href={pageUrl}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          // bg: '#B2F5EA',
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  )
}

interface MobileProps extends FlexProps {
  onOpen: () => void
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const animation = keyframes`
    to {
      background-position: 200% center;
    }
  `
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="flex-start"
      {...rest}>
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
      fontSize="3xl"
      ml="8"
      fontFamily="inter"
      fontWeight="bold"
      backgroundSize= "200% auto"
      _hover={{
        bgGradient: "linear(to-l, #B2F5EA, cyan.400)",
        bgClip: "text",
        animation: `${animation} 1s linear infinite`
      }}>
        biddr.
      </Text>
    </Flex>
  )
}