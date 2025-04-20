import express from "express"
import { signup, signin, getUserProfile, updateUserProfile } from "../controllers/authController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/signup", signup)
router.post("/signin", signin)
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile)

export default router
