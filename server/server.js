import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

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

app.use(cors());
app.use(express.json());
app.use(cookieParser()); // Middleware for cookies

app.use("/api/students", StudentRouter);
app.use("/api/communities", CommunityRouter);
app.use("/api/wallets", WalletRouter);
app.use("/api/users", AppUserRouter);
app.use("/api/posts", PostRouter);
app.use("/api/bids", BidRouter);
app.use("/api/donations", DonationRouter);
app.use("/api/comments", CommentRouter)
app.use("/auth", UserRouter);
app.use("/refresh", RefreshTokenRouter)
app.use("/logout", LogoutRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
