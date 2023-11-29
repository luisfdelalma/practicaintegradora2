const { Router } = require("express")
const { userModel } = require("../models/user.model")
const passport = require("passport")
const { createHash, isValidatedPassword, generateToken, authToken } = require("../../utils")
const initializePassport = require("../config/passport.config")(passport)
const jwt = require("jsonwebtoken")



const router = Router()

router.get("/register", async (req, res) => {
    res.render("register")
})

router.post("/register", async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body

    try {
        let user = await userModel.findOne({ email: email })
        if (user) {
            console.log("El usuario ya existe");
            res.render("useralreadyexists")
        }
        const newUser = { first_name, last_name, email, age, password: createHash(password) }


        let result = await userModel.create(newUser)
        const access_token = generateToken(newUser)
        // res.render("successregister")
        res.send({ status: "success", payload: result, access_token })

    } catch (error) {
        console.log("Error al obtener el usuario" + error)
    }
})

router.get("/successregister", async (req, res) => {
    res.render("successregister")
})

router.get("/userAlreadyExists", async (req, res) => {
    res.render("useralreadyexists")
})

router.get("/login", async (req, res) => {
    res.render("login")
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body
    console.log(req.body);
    if (!email || !password) return res.status(400).send({ status: "error", error: "Faltan valores" })

    let user = await userModel.findOne({ email: email })

    if (!user) return res.status(400).send({ status: "error", error: "Usuario no registrado" })

    if (!isValidatedPassword(user, password)) { res.status(403).send({ status: "error", error: "Password incorrecto" }) }

    let token = jwt.sign({ email, password }, "coderKey", { expiresIn: "12h" })
    delete user.password
    res.cookie("CoderCookie", token, { maxAge: 60 * 60 * 12 * 1000, httpOnly: true }).send({ message: "logged in!" })


})

router.get("/current", passport.authenticate("jwt", { session: false }), (req, res) => {
    res.send({ status: "success", payload: req.user })
})



module.exports = router