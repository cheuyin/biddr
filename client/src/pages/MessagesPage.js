import { useEffect, useState } from 'react';
import { Container, Grid, GridItem } from '@chakra-ui/react';
import useAuth from '../hooks/useAuth';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import MessagesView from '../components/MessagesView';
import ChatPane from '../components/ChatPane';
import StatusPopup from '../components/StatusPopup';

const MessagesPage = () => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [chats, setChats] = useState([]);
  const [selectedChatID, setSelectedChatID] = useState(0);
  const [popupMessage, setpopUpMessage] = useState({});

  const getChatData = async () => {
    if (auth.email) {
      try {
        const response = await axiosPrivate.get(
          '/api/chats/users/' + auth.email,
        );
        setChats(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getChatData();
  }, [auth.email, axiosPrivate]);

  const onChatClick = (chatID) => {
    setSelectedChatID(chatID);
  };

  const onChatDelete = async (chatID) => {
    try {
      await axiosPrivate.delete('/api/chats/' + chatID);
      getChatData();
      setpopUpMessage({
        message: `Successfully deleted Chat ${chatID}`,
        isError: false,
      });
    } catch (error) {
      console.log(error);
      setpopUpMessage({
        message: `Chat #${chatID} couldn't be deleted.`,
        isError: true,
      });
    } finally {
      setTimeout(() => {
        setpopUpMessage({});
      }, 5000);
    }
  };

  return (
    <>
      <Container
        boxShadow={'lg'}
        maxW="100%"
        height={'90vh'}
        backgroundColor={'white'}
        borderRadius={'lg'}
        p={0}
      >
        <Grid
          gridTemplateColumns={'minmax(200px, 1fr) 3fr'}
          width="100%"
          height={'100%'}
          gridGap={4}
          py={4}
        >
          <GridItem borderRight={'2px'} borderColor={'gray.200'} p={3}>
            <ChatPane
              chats={chats}
              onClick={onChatClick}
              selectedChatID={selectedChatID}
              onChatDelete={onChatDelete}
            />
          </GridItem>
          <GridItem>
            <MessagesView chatID={selectedChatID} />
          </GridItem>
        </Grid>
      </Container>
      {popupMessage.message && (
        <StatusPopup
          message={popupMessage.message}
          isError={popupMessage.isError}
        />
      )}
    </>
  );
};

export default MessagesPage;
