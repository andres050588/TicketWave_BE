import express from "express"
import ticketRoutes from "./tickets.js"
import authRoutes from "./authentication.js"

const router = express.Router()

router.use("/api", ticketRoutes) //Le rotte dei ticket
router.use("/api", authRoutes)

export default router
