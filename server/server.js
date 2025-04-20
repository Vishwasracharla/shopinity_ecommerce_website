import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoutes from "./routes/auth.js"
import productRoutes from "./routes/products.js"
import cartRoutes from "./routes/cart.js"
import orderRoutes from "./routes/orders.js"
import recommendRoutes from "./routes/recommend.js"

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err))

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/products", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/recommend", recommendRoutes)

// Basic route for testing
app.get("/", (req, res) => {
  res.send("API is running...")
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
