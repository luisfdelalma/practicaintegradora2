const mongoose = require("mongoose")
const usersCollection = "users"

const usersSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    email: { type: String, index: true },
    age: Number,
    password: String,
    cart: { type: mongoose.Schema.Types.ObjectId, ref: "carts" },
    role: { type: String, default: "user" }
})

const userModel = mongoose.model(usersCollection, usersSchema)

module.exports = { userModel }