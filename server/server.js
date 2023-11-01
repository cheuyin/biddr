import { express } from "express";
const app = express();
const port = 3000;

import { StudentController } from "./controllers/StudentController";

app.use("/api/students", StudentController);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
