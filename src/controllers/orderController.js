import Order from "../models/Orders.js"
import Ticket from "../models/Ticket.js"
import { Op } from "sequelize"

export const createOrder = async (request, response) => {
    try {
        const { ticketId } = request.body
        const userId = request.user.userId

        if (!ticketId) {
            return response.status(400).json({ error: "ticketId e obbligatorio" })
        }

        // Scelta del biglietto
        const ticket = await Ticket.findByPk(ticketId)
        if (!ticket) {
            return response.status(404).json({ error: "Biglietto non trovato" })
        }
        if (ticket.status !== "disponibile") {
            return response.status(400).json({ error: "Biglietto non disponibile" })
        }
        // Calcolo del tempo di scadenza dello status 'impegnato' 15 min
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000)

        // Assegnamento dello stato del biglietto 'impegnato'
        await ticket.update({ status: "impegnato" })

        // Creazione del ordine
        const order = await Order.create({
            userId,
            ticketId,
            status: "impegnato",
            expiresAt
        })

        return response.status(201).json({
            orderId: order.id,
            ticketId: ticket.id,
            expiresAt
        })
    } catch (error) {
        console.log("Errore durante la creazione dell'ordine:", error)
        response.status(500).json({ error: "Errore interno del server" })
    }
}

export const getUserOrders = async (request, response) => {
    try {
        const userId = request.user.userId

        const orders = await Order.findAll({
            where: { userId },
            include: [
                {
                    model: Ticket,
                    attributes: ["title", "price", "status", "eventDate"]
                }
            ],
            order: [["createdAt", "DESC"]]
        })
        return response.json(orders)
    } catch (error) {
        console.log("Errore nel recupero degli ordini:", error.message)
        return response.status(500).json({ error: "Erroreinterno del server" })
    }
}

export const releaseExpiredOrders = async () => {
    try {
        const expiredOrders = await Order.findAll({
            where: {
                status: "impegnato",
                expiresAt: { [Op.lt]: new Date() }
            },
            include: Ticket
        })

        for (const order of expiredOrders) {
            // Aggiornamento ticket a 'disponibile'
            await order.Ticket.update({ status: "disponibile" })
            // Cambio stato di ordine
            await order.update({ status: "scaduto" })
            console.log(`Ordine scaduto liberato: ${order.id}`)
        }
    } catch (error) {
        console.error("Errore durante rilascio ordini scaduti:", error)
    }
}

export const completeOrder = async (request, response) => {
    try {
        const { id } = request.params
        const userId = request.user.userId

        const order = await Order.findOne({
            where: { id, userId },
            include: Ticket
        })

        if (!order) {
            return response.status(404).json({ error: "Ordine non trovato" })
        }

        if (order.status !== "impegnato") {
            return response.status(400).json({ error: "Ordine non in stato disponibile per il completamento" })
        }

        //La verifica se e scaduto
        if (new Date(order.expiresAt) < new Date()) {
            return response.status(400).json({ error: "Ordine scaduto" })
        }

        //Aggiorna stato ordine e ticket
        await order.update({ status: "acquistato" })
        await order.Ticket.update({ status: "acquistato" })

        return response.status(200).json({
            message: "Ordine completato con successo",
            orderId: order.id,
            ticket: {
                title: order.Ticket.title,
                price: order.Ticket.price
            }
        })
    } catch (error) {
        console.error("Error nel completamento dell'ordine:", error)
        response.status(500).json({ error: "Errore interno del server" })
    }
}
