import {
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Post from '../components/posts/Post.tsx';
import { useEffect, useState } from 'react';
import axios from '../api/axios';
import CommentList from '../components/posts/CommentList.tsx';
import TransactionList from '../components/posts/TransactionList.tsx';
const PostPage = ({ type }) => {
  const { id } = useParams();

  const [postInfo, setPostInfo] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [comments, setComments] = useState([]);

  const navigate = useNavigate();

  const getPostInfo = async () => {
    try {
      const response = await axios.get(`/api/posts/${id}`);
      setPostInfo(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const getHistoricTransactions = async () => {
    try {
      const response = await axios.get(
        `/api/posts/${id}/${type === 'auction' ? 'bids' : 'donations'}`,
      );
      setTransactions(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getComments = async () => {
    try {
      const response = await axios.get(`/api/comments/post/${id}`);
      setComments(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    getPostInfo();
    getHistoricTransactions();
    getComments();
  }, []);

  return (
    <>
      <Button onClick={goBack}>Go back</Button>
      {postInfo ? <Post post={postInfo} /> : <div>Loading...</div>}
      <Tabs variant="enclosed">
        <TabList colorScheme="blue">
          <Tab>Comments</Tab>
          <Tab>{type === 'auction' ? 'Bid' : 'Donation'} History</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <CommentList comments={comments} />
          </TabPanel>
          <TabPanel>
            <TransactionList transactions={transactions} type={type} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default PostPage;
