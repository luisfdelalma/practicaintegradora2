const passport = require("passport")
const { userModel } = require("../models/user.model")
const { createHash, isValidatedPassword } = require("../../utils")
const jwt = require("passport-jwt")

const JWTStrategy = jwt.Strategy
const extractJWT = jwt.ExtractJwt

const cookieExtractor = req => {
    let token = null
    if (req && req.cookies) {
        token = req.cookies["CoderCookie"]
    }
    return token
}

const initializePassport = () => {
    passport.use("jwt", new JWTStrategy({
        jwtFromRequest: extractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: "coderKey"
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload)
        } catch (error) {
            return done(error)
        }
    }
    ))
}

module.exports = initializePassport