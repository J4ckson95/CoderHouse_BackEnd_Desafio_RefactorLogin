import { Router } from "express";
import userModel from "../models/user.model.js"
import { isValidPassword, createHash } from "../utils.js"
import passport from "passport";

const router = Router()

router.post("/login", async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).send({ status: "Error", error: "Incomplete Values" })
    const user = await userModel.findOne({ email: email })
    if (!user) return res.status(401).send({ status: "Error", error: "User Not Found" })
    if (!isValidPassword(user, password)) return res.status(403).send("Password invalid")
    req.session.user = user
    res.render("index", user)
})
router.post("/register", async (req, res) => {
    const user = req.body
    user.password = createHash(user.password)
    await userModel.create(user)
    res.redirect("/login")
})
router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.send("Logout Error")
        res.redirect("/login")
    })
})
//!----------------------------------------------------------------
router.get(
    "/login/github",
    passport.authenticate("github", { scope: ["user:email"] })
)
router.get(
    "/login/githubcallback",
    passport.authenticate("github", { failureRedirect: "/login" }),
    (req, res) => {
        console.log("callback", req.user);
        req.session.user = req.user
        res.redirect("/index")
    }
)
export default router