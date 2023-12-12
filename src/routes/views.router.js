import { Router } from "express";

const router = Router()
const sessionIn = (req, res, next) => {
    if (req.session?.user) return res.redirect("/index")
    return next()
}
const auth = (req, res, next) => {
    if (!req.session?.user) return res.redirect("/login")
    return next()
}
router.get("/login", sessionIn, (req, res) => {
    return res.render("login", {})
})
router.get("/register", sessionIn, (req, res) => {
    return res.render("register", {})
})
router.get("/index", auth, (req, res) => {
    return res.render("index", {})
})
export default router