import express from "express";
const app = express();
const port = 3000;

import StudentRouter from "./routes/StudentRouter.js"

app.use("/api/students", StudentRouter);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
