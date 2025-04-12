import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/Users.js"

export const register = async (request, response) => {
    try {
        const { name, email, password } = request.body
        if (!name || !email || !password) {
            return response.status(400).json({ error: "Nome, email o password assenti" })
        }
        // Controllo se l'user esistesse gia
        const existingUser = await User.findOne({ where: { email } })
        if (existingUser) {
            return response.status(409).json({ error: "User gia registrato" })
        }
        // Criptazzione password
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        const token = jwt.sign({ userId: user.id, name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" })

        response.status(201).json({ token })
    } catch (error) {
        console.error("Errore durante la registrazione: ", error)
        response.status(500).json({ error: "Errore server" })
    }
}
