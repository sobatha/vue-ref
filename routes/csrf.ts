import express from 'express'
import session from 'express-session'
import cookieParser from 'cookie-parser'

export const csrf = express.Router()

csrf.use(
    session({
        secret: "session",
        resave: false,
        saveUninitialized:true,
        cookie: {
            httpOnly: true,
            secure: false,
            maxAge: 60 * 1000 * 5
        }
    })
)

csrf.use(express.urlencoded({extended: true}))
csrf.use(cookieParser())

let sessionData:any = {}

csrf.post("/login" , (req, res)=>{
    const { username, password} = req.body
    if (username !== 'user1' || password !== "Passw0rd!") {
        res.status(403)
        res.send('login fail')
        return
    }
    sessionData = req.session
    sessionData.username = username
    res.redirect("/csrf_test.html")
})

csrf.post("/remit" , (req, res)=>{
    if (!req.session.username || req.session.username !== sessionData.username) {
        res.status(403)
        res.send('loginしていません')
        return
    }
    const {to, amount} = req.body
    res.send(`${to}に${amount}円送金しました`)
})