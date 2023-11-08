import express from "express";

const app = express();

import StudentRouter from "./routes/StudentRouter.js";
import CommunityRouter from "./routes/CommunityRouter.js";

app.use(express.json());
app.use("/api/students", StudentRouter);
app.use("/api/communities", CommunityRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
