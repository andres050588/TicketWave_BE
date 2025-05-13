import Order from "../models/Orders.js"
import Ticket from "../models/Ticket.js"
import { Op } from "sequelize"

export const availableOrderTimer = async () => {
    try {
        const now = new Date()

        const expiredOrders = await Order.findAll({
            where: {
                status: "impegnato",
                expiresAt: {
                    [Op.lt]: now
                }
            },
            include: [
                {
                    model: Ticket,
                    as: "Ticket"
                }
            ]
        })

        if (expiredOrders.length === 0) return

        for (const order of expiredOrders) {
            await order.update({ status: "scaduto" })
            await order.Ticket.update({ status: "disponibile" })
            console.log(`Ordine ${order.id} scaduto e biglietto rilascato`)
        }
    } catch (error) {
        console.error("Errore nel rilascio biglietti da ordini scaduti", error)
    }
}
