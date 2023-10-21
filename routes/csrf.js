import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import crypto from 'crypto'
export const csrf = express.Router();
csrf.use(session({
    secret: "session",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 60 * 1000 * 5
    }
}));
csrf.use(express.urlencoded({ extended: true }));
csrf.use(cookieParser());
let sessionData = {};
csrf.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (username !== 'user1' || password !== "Passw0rd!") {
        res.status(403);
        res.send('login fail');
        return;
    }

    sessionData = req.session;
    sessionData.username = username;

    const token = crypto.randomUUID();
    res.cookie("csrf_token", token, {secure: true})
    res.redirect("/csrf_test.html");
});
csrf.post("/remit", (req, res) => {
    if (!req.session.username || req.session.username !== sessionData.username) {
        res.status(403);
        res.send('loginしていません');
        return;
    }
    if (req.cookies["csrf_token"] !== req.body["csrf_token"]) {
        res.status(400)
        res.send("不正")
        return;
    }
    const { to, amount } = req.body;
    res.send(`${to}に${amount}円送金しました`);
});
