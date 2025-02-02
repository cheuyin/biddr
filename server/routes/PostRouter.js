import express from 'express';
import {
  DeletePost,
  GetPost,
  PostPost,
  PostLikes,
  DeleteLikeOnPost,
  GetNumLikesOnPost,
} from '../controllers/PostController.js';
import { CancelPost } from '../services/PostTable.js';
import {
  GetAllBidsForAuction,
  GetAllDonationsForFundraiser,
  GetHighestBidValueForAuction,
} from '../controllers/TransactionController.js';

const router = express.Router();

// router.get("/:email/:name", GetWallet);
router.get('/:postId', GetPost);
router.post('/', PostPost);
router.delete('/:postId', DeletePost);
router.get('/:postId/bids', GetAllBidsForAuction);
router.get('/:postId/bids/highest', GetHighestBidValueForAuction);
router.get('/:postId/donations', GetAllDonationsForFundraiser);

/*
LIKES ROUTES
*/
router.post('/:postId/likes/', PostLikes);
router.delete('/:postId/likes/:email', DeleteLikeOnPost);
router.get('/:postId/likes/', GetNumLikesOnPost);

export default router;
