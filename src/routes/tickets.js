import express from "express"
import { availableTickets, createTicket } from "../controllers/ticketController.js"
import { verifyToken } from "../middleware/authMiddleware.js"

const router = express.Router()

// GET /api/tickets - ritorna tutti i biglietti disponibili da ../controllers/ticketController.js
router.get("/tickets", availableTickets)
router.post("/tickets", verifyToken, createTicket)

export default router
