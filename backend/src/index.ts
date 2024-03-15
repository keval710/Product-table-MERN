import express from "express"
import cors from "cors"
import route from "./routes/Router";
import "./db/connection"
const app = express();

app.use(cors({
    origin: '*'
}))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static("images"))
app.use(route)

app.listen(5000, () => console.log("server started on port 5000"));