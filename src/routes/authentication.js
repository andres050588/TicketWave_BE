import express from "express"
import { login, register, userProfile } from "../controllers/authController.js"
import { verifyToken } from "../middleware/authMiddleware.js"

const routerAuth = express.Router()

routerAuth.post("/register", register)
routerAuth.post("/login", login)
routerAuth.get("/profile", verifyToken, userProfile)

export default routerAuth
