import express from "express"
import sequelize from "./config/db.js"
import db from "./models/index.js" //import dei modelli
import listEndpoints from "express-list-endpoints"
import cors from "cors"
import dotenv from "dotenv"
import routes from "./routes/index.js"
import { releaseExpiredOrders } from "./controllers/orderController.js"

dotenv.config()

const app = express()

//midleware
app.use(cors())
app.use(express.json())
app.use(routes) //rotte API
// Esegui ogni minuto
setInterval(releaseExpiredOrders, 60 * 1000)

try {
    await sequelize.authenticate()
    console.log("Connessione al database riuscita!")
    await sequelize.sync() // aggiorna DB se modifico i modelli
} catch (error) {
    console.log("Errore nella conessione al DB:", error)
}

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`)
    console.table(listEndpoints(app))
})
