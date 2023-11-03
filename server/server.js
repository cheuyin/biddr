import express from "express";
const app = express();

import StudentRouter from "./routes/StudentRouter.js"

app.use("/api/students", StudentRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

