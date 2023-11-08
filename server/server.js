import express from "express";
import cors from "cors";
const app = express();

import StudentRouter from "./routes/StudentRouter.js"
import AppUserRouter from "./routes/AppUserRouter.js"

app.use(cors());
app.use(express.json());
app.use("/api/students", StudentRouter);
app.use("/api/users", AppUserRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

