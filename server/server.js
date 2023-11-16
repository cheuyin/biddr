import express from "express";
import cors from "cors";
const app = express();

import StudentRouter from "./routes/StudentRouter.js";
import CommunityRouter from "./routes/CommunityRouter.js";
import WalletRouter from "./routes/WalletRouter.js";
import AppUserRouter from "./routes/AppUserRouter.js";
import PostRouter from "./routes/PostRouter.js";
import CommentRouter from "./routes/CommentRouter.js"

app.use(cors());
app.use(express.json());
app.use("/api/students", StudentRouter);
app.use("/api/communities", CommunityRouter);
app.use("/api/wallets", WalletRouter);
app.use("/api/users", AppUserRouter);
app.use("/api/posts", PostRouter);
app.use("/api/comments", CommentRouter)

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
