import express from "express"
import ticketRoutes from "./tickets.js"
import authRoutes from "./authentication.js"
import ordersRoutes from "./orders.js"

const router = express.Router()

router.use("/api", authRoutes)
router.use("/api", ticketRoutes) //Le rotte dei ticket
router.use("/api", ordersRoutes) //Le rotte dei biglietti

export default router
