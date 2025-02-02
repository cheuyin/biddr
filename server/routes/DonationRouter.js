import express from 'express';

const router = express.Router();

import {
  GetDonation,
  PostDonation,
} from '../controllers/TransactionController.js';

router.post('/', PostDonation);
router.get('/:donationId', GetDonation);

export default router;
