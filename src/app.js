import express from "express"
import mongoose from "mongoose"
import session from "express-session"
import mongoStore from "connect-mongo"
import handlebars from "express-handlebars"
import __dirname from "./utils.js"
import viewsRouter from "./routes/views.router.js"
import sessionRouter from "./routes/session.router.js"

const app = express()
const mongoUrl = "mongodb+srv://J4ckson:IIQyDhhK1Ax1pSgX@coderhousebackend.jdnxmo1.mongodb.net/"
const dbName = "ecommerce"

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
    store: mongoStore.create({
        mongoUrl: mongoUrl,
        dbName: dbName
    }),
    secret: "secret",
    resave: true,
    saveUninitialized: true
}))

app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + `/views`)
app.set("view engine", "handlebars")

app.use("/", viewsRouter)
app.use("/api/session", sessionRouter)

mongoose.connect(mongoUrl, { dbName: dbName })
    .then(() => {
        console.log("DataBase connected ...");
        app.listen(8080, () => console.log("Running Server ... <(--_--)>"))
    }).catch((e) => console.log(e.message))
