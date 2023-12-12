import passport from "passport";
import userModel from "../models/user.model.js";
import GitHubStrategy from "passport-github2"

const initializePassport = () => {
    passport.serializeUser((user, done) => {
        done(null, user._id)
    })
    passport.deserializeUser(async (id, done) => {
        const user = await userModel.findById(id)
        done(null, user)
    })
    passport.use()
}