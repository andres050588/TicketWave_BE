import jwt from "jsonwebtoken"

const extractTokenFromHeader = authHeader => {
    if (!authHeader || typeof authHeader !== "string") return null

    const parts = authHeader.split(" ")

    if (parts.length !== 2 || parts[0] !== "Bearer") {
        return null // formato errato: tipo  "abc123" o "Bearerabc123"
    }

    return parts[1] // il vero token
}

export const verifyToken = (request, response, next) => {
    const accessToken = extractTokenFromHeader(request.headers.authorization)

    if (!accessToken) {
        return response.status(401).json({ error: "Token assente o malformato" })
    }

    try {
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET)
        request.user = decoded // decodifica i dati del user(userId, email, name) per usarli in sicurezza in file controllers
        next()
    } catch (error) {
        return response.status(403).json({ error: "Token non valido" })
    }
}

export const verifyAdmin = (request, response, next) => {
    if (!request.user.isAdmin) {
        return response.status(403).json({ error: "Accesso riservato agli admin" })
    }
    next()
}
