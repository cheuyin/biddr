import { useState } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  TableContainer,
  Container,
  Box,
  Heading,
  Center,
  Button,
} from '@chakra-ui/react';

const DivisionSearch = () => {
  const [usersInAllChats, setUsersInAllChats] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  const handleGetUsersInAllChats = async () => {
    try {
      const response = await axiosPrivate.get('/api/search/division');
      setUsersInAllChats(response.data.data);
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <Container
      boxShadow={'lg'}
      maxW="100%"
      height={'90vh'}
      backgroundColor={'white'}
    >
      <Box height={'100%'} p={4}>
        <Heading textAlign={'center'} mb={4}>
          Division: Find Users in All Group Chats
        </Heading>
        <Center>
          <Button onClick={handleGetUsersInAllChats}>Search</Button>
        </Center>
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Td>Full Name</Td>
                <Td>Email</Td>
              </Tr>
            </Thead>
            <Tbody>
              {usersInAllChats.map((user) => (
                <Tr key={user.email}>
                  <Td>{user.fullname}</Td>
                  <Td>{user.email}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default DivisionSearch;
