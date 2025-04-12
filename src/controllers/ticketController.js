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

export const createTicket = async (request, response) => {
    try {
        const { title, price, eventDate, userId } = request.body

        if (!title || !price || !userId || !eventDate) {
            // validazione dei campi
            return response.status(400).json({ message: "Campi obligatori mancanti" })
        }
        if (title.length < 3 || title.length > 100) {
            return response.status(400).json({ error: "Il titolo deve avere tra 3 e 100 caratteri" })
        }
        if (isNaN(price) || price <= 0) {
            // validazione del prezzo
            return response.status(400).json({ error: "Il prezzo deve essere un numero positivo" })
        }

        const newTicket = await Ticket.create({
            title,
            price,
            eventDate,
            status: "disponibile",
            userId
        })
        // formatazione italiana della data evento
        const createdAtFormatted = newTicket.createdAt.toLocaleString("it-IT", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        })
        response.status(201).json({
            id: newTicket.id,
            createdAt: createdAtFormatted
        })
    } catch (error) {
        console.error("Errore durante la creazione del biglietto:", error)
        response.status(500).json({ error: "Errore proveniente dal server" })
    }
}
