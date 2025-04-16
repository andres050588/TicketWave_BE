import express from "express"
import { createOrder, completeOrder, getUserOrders } from "../controllers/orderController.js"
import { verifyToken } from "../middleware/authMiddleware.js"

const routerOrders = express.Router()

// POST api/orders - crea un ordine autenticato
routerOrders.post("/orders", verifyToken, createOrder)

//POST finalizza i'ordine
routerOrders.post("/orders/:id/complete", verifyToken, completeOrder)

//GET mostra ordini utente
routerOrders.get("/orders", verifyToken, getUserOrders)

export default routerOrders
