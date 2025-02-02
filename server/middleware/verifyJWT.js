// Source: https://www.youtube.com/watch?v=favjC6EKFgw (21:08)
// I used this series by Dave Lee to learn how to implement the authentication system

import jwt from 'jsonwebtoken';

// This is middleware for verifying a user's auth token. Attach it to protected routes
// so that only verified users can access them.
const verifyJWT = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.sendStatus(401);
  }
  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.JWT_ACCESS_TOKEN_KEY, (error, decoded) => {
    if (error) {
      return res.sendStatus(403); // Forbidden status code
    }
    next();
  });
};

export default verifyJWT;
