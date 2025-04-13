import express from "express"
import { login, register, userProfile } from "../controllers/authController.js"
import { verifyToken } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.get("/profile", verifyToken, userProfile)

export default router
