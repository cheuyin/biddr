import express from "express";
const app = express();

import cors from "cors";
import credentials from "./middleware/credentials.js";
import corsOptions from "./config/corsOptions.js";
import cookieParser from "cookie-parser";
import verifyJWT from "./middleware/verifyJWT.js";

import CommunityRouter from "./routes/CommunityRouter.js";
import AppUserRouter from "./routes/AppUserRouter.js";
import WalletRouter from "./routes/WalletRouter.js";
import PostRouter from "./routes/PostRouter.js";
import BidRouter from "./routes/BidRouter.js";
import DonationRouter from "./routes/DonationRouter.js";
import CommentRouter from "./routes/CommentRouter.js";
import AuthRouter from "./routes/AuthRouter.js";

// Tells the client whether their origin is allowed to make requests to the server
app.use(credentials);
// Enable only certain origins to make request to this server
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser()); // Middleware for cookies

// The authentication layer
app.use("/auth", AuthRouter);

// app.use(verifyJWT);

// Everything past here requires the client to be authenticated
app.use("/api/communities", CommunityRouter);
app.use("/api/wallets", WalletRouter);
app.use("/api/users", AppUserRouter);
app.use("/api/posts", PostRouter);
app.use("/api/bids", BidRouter);
app.use("/api/donations", DonationRouter);
app.use("/api/comments", CommentRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
