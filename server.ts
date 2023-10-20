import express from 'express'
import {router} from './routes/api'
import {csrf} from './routes/csrf'

const app: express.Express = express();
const port: number = 3000;

app.use(express.static("public"));
app.use("/api", router)
app.use("/csrf", csrf)
app.get("/", (req, res, next)=>{
    res.end("Top Page")
})

app.listen(port, ()=> {
    console.log(`server is running at http://localhost:${port}`)
})