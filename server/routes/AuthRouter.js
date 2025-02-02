// Source: https://www.youtube.com/watch?v=favjC6EKFgw
// I used this series by Dave Lee to learn how to implement the authentication system

import express from 'express';
import {
  PostAppUser,
  GetLocationAgeOfMajorityValues,
} from '../controllers/AppUserController.js';
import { Signin, Refresh, Logout } from '../controllers/AuthController.js';

const router = express.Router();

router.get('/locations', GetLocationAgeOfMajorityValues);
router.post('/signin', Signin);
router.post('/signup', PostAppUser);
router.put('/logout', Logout);
router.get('/refresh', Refresh);

export default router;
