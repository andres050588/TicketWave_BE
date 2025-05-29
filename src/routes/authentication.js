import express from "express"
import { login, register, userProfile } from "../controllers/authController.js"
import { verifyToken } from "../middleware/authMiddleware.js"

const routerAuth = express.Router()

// Applicato express.json() qui
routerAuth.post("/register", express.json(), register)
routerAuth.post("/login", express.json(), login)

routerAuth.get("/profile", verifyToken, userProfile)

export default routerAuth
