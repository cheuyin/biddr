// import {
//   CancelPost,
//   CreatePost,
//   QueryPost,
//   QueryPostsByUser,
//   QueryPostsInCommunity,
// } from "../services/PostTable.js";

import {
  QueryBid,
  QueryHighestBidForAuction,
  CreateBid,
  QueryAllBidsForWallet,
  QueryAllBidsForAuction,
  QueryDonation,
  QueryAllDonationsForFundraiser,
  QueryAllDonationsForWallet,
  CreateDonation,
} from '../services/TransactionTable.js';

export const GetBid = async (req, res) => {
  const bidId = req.params.bidId;

  try {
    const data = await QueryBid(bidId);
    return res.status(200).json(data);
  } catch (err) {
    return res.send(err.toString());
  }
};

export const GetAllBidsForAuction = async (req, res) => {
  const postId = req.params.postId;
  try {
    const data = await QueryAllBidsForAuction(postId);
    return res.status(200).json(data);
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'The bids are secret. jk, u did something wrong' });
  }
};

export const GetAllBidsForWallet = async (req, res) => {
  const email = req.params.email;
  const name = req.params.name;
  try {
    const data = await QueryAllBidsForWallet(name, email);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(400).json({
      error: 'this wallet is private, mr irs. jk, u did something wrong',
    });
  }
};

export const GetHighestBidValueForAuction = async (req, res) => {
  const postId = req.params.postId;
  try {
    const data = await QueryHighestBidForAuction(postId);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(400).json({
      error: "dunno, can't fetch you the highest bid... something went wrong",
    });
  }
};

export const PostBid = async (req, res) => {
  const { walletName, email, postId, amount } = req.body;
  if (!walletName || !email || !postId || !amount) {
    return res.status(400).json({
      error: "Can't make the bid if u don't give me all the info I need",
    });
  }

  const currentDate = new Date().toISOString().replace(/\.\d*Z/, '');
  const highestBid = await QueryHighestBidForAuction(postId);
  if (amount <= highestBid) {
    return res.status(422).json({
      error: `that's all? someones got u beat with a bid at $${highestBid}. better step up ur game`,
    });
  }
  try {
    await CreateBid(walletName, email, postId, amount, currentDate);
    return res
      .status(200)
      .json({ message: 'Wealthy I see. Your bid is in good hands' });
  } catch (err) {
    return res.status(400).send(err.toString());
  }
};

export const GetDonation = async (req, res) => {
  const donationId = req.params.donationId;

  try {
    const data = await QueryDonation(donationId);
    return res.status(200).json(data);
  } catch (err) {
    return res.send(err.toString());
  }
};

export const GetAllDonationsForFundraiser = async (req, res) => {
  const postId = req.params.postId;
  try {
    const data = await QueryAllDonationsForFundraiser(postId);
    return res.status(200).json(data);
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'The donations are secret. jk, u did something wrong' });
  }
};

export const GetAllDonationsForWallet = async (req, res) => {
  const email = req.params.email;
  const name = req.params.name;
  try {
    const data = await QueryAllDonationsForWallet(name, email);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(400).json({
      error: 'this wallet is private, mr irs. jk, u did something wrong',
    });
  }
};

export const PostDonation = async (req, res) => {
  const { walletName, email, postId, amount } = req.body;
  if (!walletName || !email || !postId || !amount) {
    return res.status(400).json({
      error: "Can't make the donation if u don't give me all the info I need",
    });
  }

  const currentDate = new Date().toISOString().replace(/\.\d*Z/, '');

  try {
    await CreateDonation(walletName, email, postId, amount, currentDate);
    return res
      .status(200)
      .json({ message: 'Wealthy I see. Your donation is in good hands' });
  } catch (err) {
    return res.status(400).send(err.toString());
  }
};
