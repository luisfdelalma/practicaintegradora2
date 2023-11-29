const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const PRIVATE_KEY = "CoderKey"

const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10))
const isValidatedPassword = (user, password) => bcrypt.compareSync(password, user.password)


module.exports = { createHash, isValidatedPassword }