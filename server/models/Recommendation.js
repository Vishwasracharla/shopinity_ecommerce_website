import mongoose from "mongoose"

const recommendationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      name: { type: String, required: true },
      image: { type: String, required: true },
      price: { type: Number, required: true },
      description: { type: String, required: true },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400, // Expires after 24 hours
  },
})

const Recommendation = mongoose.model("Recommendation", recommendationSchema)

export default Recommendation
