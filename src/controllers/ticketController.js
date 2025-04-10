import Ticket from "../models/Ticket.js"

export const availableTickets = async (req, res) => {
    try {
        const tickets = await Ticket.findAll({
            where: { status: "disponibile" }
        })
        res.json(tickets)
    } catch (error) {
        console.error("Errore nel recupero dei biglietti disponibili -", error)
        res.status(500).json({ error: "Errore server" })
    }
}
