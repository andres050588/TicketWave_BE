import User from "./User.js"
import Ticket from "./Ticket.js"
import Order from "./Orders.js"

// Un utente può avere più ordini
User.hasMany(Order, { foreignKey: "userId", as: "Orders" })
Order.belongsTo(User, { foreignKey: "userId", as: "Buyer" })

// Un biglietto può essere legato ad un ordine
Ticket.hasOne(Order, { foreignKey: "ticketId", as: "Order" })
Order.belongsTo(Ticket, { foreignKey: "ticketId", as: "Ticket" })

// Un utente può mettere in vendita più biglietti
User.hasMany(Ticket, { foreignKey: "userId", as: "Tickets" })
Ticket.belongsTo(User, { foreignKey: "userId", as: "Seller" })

const db = { User, Ticket, Order }

export default db
