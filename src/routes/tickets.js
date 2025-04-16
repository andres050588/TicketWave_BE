import express from "express"
import { createTicket, availableTickets, getMyTickets } from "../controllers/ticketController.js"
import { verifyToken } from "../middleware/authMiddleware.js"

const routerTickets = express.Router()

routerTickets.post("/tickets", verifyToken, createTicket)
// GET /api/tickets - ritorna tutti i biglietti disponibili da ../controllers/ticketController.js
routerTickets.get("/tickets", availableTickets)
// Lista dei biglietti dell'utente loggato
routerTickets.get("/mytickets", verifyToken, getMyTickets)

export default routerTickets
