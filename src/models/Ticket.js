import { DataTypes } from "sequelize"
import sequelize from "../config/db.js"

const Ticket = sequelize.define(
    "Ticket",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4, //per generare un id unico ed sicuro
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM("disponibile", "impegnato", "acquistato"),
            defaultValue: "disponibile"
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false
        }
    },
    {
        tableName: "tickets",
        timestamps: true
        //logging: false
    }
)

export default Ticket
