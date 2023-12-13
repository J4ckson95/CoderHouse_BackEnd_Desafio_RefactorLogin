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
    passport.use("github", new GitHubStrategy({
        clientID: "Iv1.9db8414b561e997d",
        clientSecret: "8e6616f38f88ccf00db8067d51552b337b2ff391",
        callbackURL: "http://127.0.0.1:8080/api/session/login/githubcallback"
    }, async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        try {
            const user = await userModel.findOne({ email: profile._json.email })
            if (user) return done(null, user)
            const newUser = await userModel.create({
                username: profile._json.name,
                email: profile._json.email,
                password: ""
            })
            return done(null, newUser)
        } catch (error) {
            return done(`Error to login with github` + error)
        }
    }))
}
export default initializePassport