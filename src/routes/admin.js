import express from "express"
import { verifyToken } from "../middleware/authMiddleware.js"
import { isAdmin } from "../middleware/isAdmin.js"
import { cleanUpExpiredOrders } from "../utils/availableOrderTimer.js"
import { verifyToken, verifyAdmin } from "../middleware/authMiddleware.js"

const routerAdmin = express.Router()

routerAdmin.post("/admin/cleanUp", verifyToken, verifyAdmin, async (request, response) => {
    try {
        await cleanUpExpiredOrders()
        response.json({ message: "Pulizia ordini scaduti eseguita con successo" })
    } catch (error) {
        console.error("Errore nell processo di pulizia ordini scaduti", error)
        response.status(500).json({ error: "Errore interno del server" })
    }
})

export default routerAdmin
