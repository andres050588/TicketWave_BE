import express from "express"
import sequelize from "./config/db.js"
import listEndpoints from "express-list-endpoints"
import cors from "cors"
import dotenv from "dotenv"
import "./models/index.js"
import routes from "./routes/index.js"
import { availableOrderTimer } from "./utils/availableOrderTimer.js"
import { cleanUpExpiredOrders } from "./jobs/cleanUpExpiredOrders.js"

//dotenv.config()

const app = express()

const whiteList = [
    process.env.FE_DEV_URL,
    process.env.FE_PROD_URL // sviluppo locale,  dominio frontend su Vercel
]

app.use(
    cors({
        origin: (origin, corsNext) => {
            if (!origin || whiteList.indexOf(origin) !== -1) {
                // Se sei nella lista si passa
                corsNext(null, true)
            } else {
                // Else errore
                const err = new Error(`Origin (${origin}) non consentita`)
                err.status = 403
                corsNext(err)
            }
        },
        credentials: true
    })
)
app.use(express.urlencoded({ extended: true }))

app.use(routes) //rotte API

console.table(listEndpoints(app))

try {
    await sequelize.authenticate()
    console.log("Connessione al database riuscita!")
    await sequelize.sync() //se { force: true } aggiorna DB totalmente, cancellando tutto
} catch (error) {
    console.log("Errore nella conessione al DB:", error)
}

app.listen(process.env.PORT, "0.0.0.0", () => {
    console.log(`Server listening on port ${process.env.PORT}`)

    // Esegui ogni minuto
    setInterval(async () => {
        try {
            await availableOrderTimer()
            await cleanUpExpiredOrders()
        } catch (err) {
            console.error("Errore nei job schedulati:", err)
        }
    }, 60 * 1000)
})
