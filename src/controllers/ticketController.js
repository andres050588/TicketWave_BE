import Ticket from "../models/Ticket.js"
import User from "../models/User.js"

// CREAZIONE DI UN BIGLIETTO
export const createTicket = async (req, res) => {
    try {
        const { title, price, eventDate } = req.body
        const userId = req.user.userId
        const imageURL = req.file?.path || null

        // Validazioni
        if (!title || !price || !eventDate) {
            return res.status(400).json({ error: "Campi obbligatori mancanti" })
        }
        if (title.length < 3 || title.length > 100) {
            return res.status(400).json({ error: "Il titolo deve avere tra 3 e 100 caratteri" })
        }
        if (isNaN(price) || price <= 0) {
            return res.status(400).json({ error: "Il prezzo deve essere un numero positivo" })
        }

        const newTicket = await Ticket.create({
            title,
            price,
            eventDate,
            imageURL,
            status: "disponibile",
            userId
        })

        return res.status(201).json({
            id: newTicket.id,
            createdAt: newTicket.createdAt.toLocaleString("it-IT", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            })
        })
    } catch (error) {
        console.error("Errore durante la creazione del biglietto:", error)
        res.status(500).json({ error: "Errore del server" })
    }
}

// LISTA BIGLIETTI DISPONIBILI
export const availableTickets = async (req, res) => {
    try {
        const tickets = await Ticket.findAll({
            where: { status: "disponibile" },
            include: [
                {
                    model: User,
                    as: "Seller",
                    attributes: ["id", "name", "email"]
                }
            ],
            order: [["createdAt", "DESC"]]
        })

        res.json(tickets)
    } catch (error) {
        console.error("Errore nel recupero dei biglietti disponibili:", error)
        res.status(500).json({ error: "Errore del server" })
    }
}

// DETTAGLIO BIGLIETTO PER ID
export const getTicketById = async (req, res) => {
    try {
        const { id } = req.params

        const ticket = await Ticket.findByPk(id, {
            include: {
                model: User,
                as: "Seller",
                attributes: ["id", "name", "email"]
            }
        })

        if (!ticket) {
            return res.status(404).json({ error: "Biglietto non trovato" })
        }

        res.json({
            id: ticket.id,
            title: ticket.title,
            price: ticket.price,
            status: ticket.status,
            userId: ticket.userId,
            createdAt: ticket.createdAt.toLocaleString("it-IT", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            }),
            eventDate: ticket.eventDate.toLocaleString("it-IT", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            }),
            venduto: ticket.status === "acquistato",
            venditore: {
                id: ticket.Seller.id,
                name: ticket.Seller.name,
                email: ticket.Seller.email
            }
        })
    } catch (error) {
        console.error("Errore nel recupero del biglietto:", error)
        res.status(500).json({ error: "Errore del server" })
    }
}

// BIGLIETTI DELL’UTENTE LOGGATO
export const getMyTickets = async (req, res) => {
    try {
        const userId = req.user.userId

        const myTickets = await Ticket.findAll({
            where: { userId },
            order: [["createdAt", "DESC"]]
        })

        res.json(myTickets)
    } catch (error) {
        console.error("Errore nel recupero dei biglietti personali:", error)
        res.status(500).json({ error: "Errore del server" })
    }
}
