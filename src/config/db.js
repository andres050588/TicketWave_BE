import { Sequelize } from "sequelize"
import dotenv from "dotenv"

//dotenv.config()

const sequelize = new Sequelize(process.env.MYSQLDATABASE, process.env.MYSQLUSER, process.env.MYSQLPASSWORD, {
    host: process.env.MYSQLHOST,
    port: process.env.MYSQLPORT,
    dialect: "mysql",
    logging: msg => {
        if (msg.toLowerCase().includes("error")) {
            console.error("ERRORE SQL:", msg)
        }
    }
})

export default sequelize
