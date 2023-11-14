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

app.use(cors());
app.use(express.json());
app.use(cookieParser()); // Middleware for cookies

app.use("/api/students", StudentRouter);
app.use("/api/communities", CommunityRouter);
app.use("/api/users", AppUserRouter);
app.use("/auth", UserRouter);
app.use("/refresh", RefreshTokenRouter)
app.use("/api/wallets", WalletRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
