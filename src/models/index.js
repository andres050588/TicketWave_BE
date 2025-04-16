import User from "./User.js"
import Ticket from "./Ticket.js"
import Order from "./Orders.js"

// Un utente puo avere piu ordini
User.hasMany(Order, { foreignKey: "userId" })
Order.belongsTo(User, { foreignKey: "userId" })

// Un biglietto puo essere legato ad un ordine
Ticket.hasOne(Order, { foreignKey: "ticketId" })
Order.belongsTo(Ticket, { foreignKey: "ticketId" })

const db = { User, Ticket, Order }

export default db
