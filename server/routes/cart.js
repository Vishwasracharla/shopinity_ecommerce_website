import express from "express"
import { getCart, addToCart, updateCartItem, removeFromCart } from "../controllers/cartController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.route("/").get(protect, getCart).post(protect, addToCart)

router.route("/:id").put(protect, updateCartItem).delete(protect, removeFromCart)

export default router
