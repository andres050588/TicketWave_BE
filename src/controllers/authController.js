import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/User.js"
import { isAdmin } from "../middleware/isAdmin.js" // per funzioni future

// -----------------------------logica di registrazzione
export const register = async (request, response) => {
    try {
        const { name, email, password } = request.body
        if (!name || !email || !password) {
            return response.status(400).json({ error: "Nome, email o password assenti" })
        }
        // Controllo se l'user esistesse gia
        const existingUser = await User.findOne({ where: { email } })
        if (existingUser) {
            return response.status(409).json({ error: "User gia esistente" })
        }
        // Criptazzione password
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        const token = jwt.sign({ userId: user.id, name: user.name, email: user.email, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: "1h" })

        return response.status(201).json({ token })
    } catch (error) {
        console.error("Errore durante la registrazione: ", error)
        return response.status(500).json({ error: "Errore server" })
    }
}

// -----------------------------Logica di login
export const login = async (request, response) => {
    try {
        const { email, password } = request.body
        if (!email || !password) {
            return response.status(400).json({ error: "Email e password sono obligatorie" })
        }

        const user = await User.findOne({ where: { email } })
        if (!user) {
            return response.status(401).json({ error: "Email o password non validi" })
        }

        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            return response.status(401).json({ error: "Email o password non validi" })
        }

        const token = jwt.sign({ userId: user.id, name: user.name, email: user.email, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: "1h" })
        return response.status(200).json({ token })
    } catch (error) {
        console.error("Errore nel login", error.message)
        return response.status(500).json({ error: error.message })
    }
}

// -----------------------------User profile (dati del profilo logato)

export const userProfile = async (request, response) => {
    try {
        const userId = request.user.userId
        const user = await User.findByPk(userId, {
            attributes: ["id", "name", "email", "createdAt"]
        })
        if (!user) {
            return response.status(404).json({ error: "Utente non trovato" })
        }

        const formattedDate = user.createdAt.toLocaleDateString("it-IT", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        })
        return response.json({
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: formattedDate
        })
    } catch (error) {
        console.error("Errore nel recupero del profilo")
        return response.status(500).json({ error: "Errore server" })
    }
}
