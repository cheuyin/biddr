// Source: https://www.youtube.com/watch?v=favjC6EKFgw (54:43)

import allowedOrigins from './allowedOrigins.js';

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessRate: 200,
};

export default corsOptions;
