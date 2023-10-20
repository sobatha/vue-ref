import express from 'express';
import { router } from './routes/api.js';
import { csrf } from './routes/csrf.js';
const app = express();
const port = 3000;
app.use(express.static("public"));
app.use("/api", router);
app.use("/csrf", csrf);
app.get("/", (req, res, next) => {
    res.end("Top Page");
});
app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`);
});
