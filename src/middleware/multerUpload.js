import multer from "multer"
import { storage } from "../config/cloudinary.js"

const multerUpload = multer({ storage })

console.log("📦 multerUpload configurato")

export default multerUpload
