import Order from "../models/Orders.js"
import { Op } from "sequelize"

export const cleanUpExpiredOrders = async () => {
    try {
        const result = await Order.destroy({
            where: {
                status: "scaduto",
                updatedAt: {
                    [Op.lt]: new Date(Date.now() - 2 * 60 * 1000) // passato in stato scaduto da oltre 2 min
                }
            }
        })
        if (result > 0) {
            console.log(`Puliti automaticamente ${result} ordini scaduti`)
        }
    } catch (error) {
        console.error("Errore nel cleanUp automatico degli ordini: ", error)
    }
}
