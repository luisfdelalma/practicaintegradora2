const express = require("express")
const exphbs = require("express-handlebars")
const mongoose = require("mongoose")
const productsRouter = require("./routes/products.router")
const cartsRouter = require("./routes/carts.router")
const usersRouter = require("./routes/users.router")
const path = require("path")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const initializePassport = require("./config/passport.config")
const passport = require("passport")


const app = express()
const PORT = 8080

// Handle bars config
app.engine("handlebars", exphbs.engine())
app.set("view engine", "handlebars")
app.set("views", path.join(__dirname, "views"))

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
initializePassport()
app.use(passport.initialize())

const environment = async () => {
    await mongoose.connect("mongodb+srv://luisfdlta:Mejorsolo1095@cluster0.aauduvj.mongodb.net/?retryWrites=true&w=majority")
}
environment()

app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)
app.use("/api/users", usersRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})