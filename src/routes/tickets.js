import express from "express"
import { availableTickets } from "../controllers/ticketController.js"

const router = express.Router()

// GET /api/tickets - ritorna tutti i biglietti disponibili da ../controllers/ticketController.js
router.get("/tickets", availableTickets)

export default router
