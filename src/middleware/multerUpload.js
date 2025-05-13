import multer from "multer"
import { storage } from "../config/cloudinary.js"

const multerUpload = multer({ storage })

export default multerUpload
