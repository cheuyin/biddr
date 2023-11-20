import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

import credentials from "./middleware/credentials.js";
import corsOptions from "./config/corsOptions.js";

import StudentRouter from "./routes/StudentRouter.js";
import CommunityRouter from "./routes/CommunityRouter.js";
import AppUserRouter from "./routes/AppUserRouter.js";
import UserRouter from "./routes/user.js";
import WalletRouter from "./routes/WalletRouter.js";
import RefreshTokenRouter from "./routes/RefreshTokenRouter.js";
import LogoutRouter from "./routes/LogoutRouter.js";;
import PostRouter from "./routes/PostRouter.js";
import BidRouter from "./routes/BidRouter.js";
import DonationRouter from "./routes/DonationRouter.js";
import CommentRouter from "./routes/CommentRouter.js"

// Tells the client whether their origin is allowed to make requests to the server
app.use(credentials);
// Enable only certain origins to make request to this server
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser()); // Middleware for cookies

// Authentication / sign-up process
app.use("/auth", UserRouter);
app.use("/refresh", RefreshTokenRouter)
app.use("/logout", LogoutRouter);

// Everything past here requires the client to be authenticated 
app.use("/api/students", StudentRouter);
app.use("/api/communities", CommunityRouter);
app.use("/api/wallets", WalletRouter);
app.use("/api/users", AppUserRouter);
app.use("/api/posts", PostRouter);
app.use("/api/bids", BidRouter);
app.use("/api/donations", DonationRouter);
app.use("/api/comments", CommentRouter)

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
