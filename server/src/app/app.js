import express from "express"
import authRoutes from '../router/auth.routes.js'
import cookieParser from 'cookie-parser'
import productRoutes from '../router/product.route.js'

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const publicDir = path.join(__dirname, '../../public')

const app = express()
app.use(express.json())
app.use(express.static(publicDir))
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/products", productRoutes)

app.get("*name", (req, res) => {
    res.sendFile(path.join(publicDir, 'index.html'))
})

export default app