import express from 'express';
export const router = express.Router();
const allowList = ["http:localhost:3000", 'https://qiita.com'];
router.use((req, res, next) => {
    if (req.headers.origin && allowList.includes(req.headers.origin)) {
        res.header("Access-Control-Allow-Origin", req.headers.origin);
    }
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Headers", "X-Token");
    }
    next();
});
router.get("/", (req, res) => {
    res.send({ message: 'hello' });
});
