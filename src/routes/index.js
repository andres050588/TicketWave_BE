import express from "express"
import ticketRoutes from "./tickets.js"

const router = express.Router()

router.use("/", ticketRoutes) //Le rotte dei ticket

export default router
