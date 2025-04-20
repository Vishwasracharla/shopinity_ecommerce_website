import { GoogleGenerativeAI } from "@google/generative-ai"
import Product from "../models/Product.js"
import Recommendation from "../models/Recommendation.js"

// @desc    Get AI-powered product recommendations
// @route   GET /api/recommend
// @access  Private
export const getRecommendations = async (req, res) => {
  try {
    // Check if we have cached recommendations
    const existingRecommendations = await Recommendation.findOne({
      userId: req.user._id,
      createdAt: { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) }, // Less than 24 hours old
    })

    if (existingRecommendations) {
      return res.json(existingRecommendations.products)
    }

    // Get user's recent purchases or viewed products
    const recentProducts = await Product.find({}).limit(5)

    // Format product data for the AI prompt
    const productData = recentProducts.map((p) => `${p.name} (${p.category}, ${p.brand}, $${p.price})`).join("\n")

    // Initialize Gemini API
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    // Create prompt for Gemini
    const prompt = `
      Based on these products:
      ${productData}
      
      Recommend 5 fashion items that would complement these. For each item, provide:
      1. Name
      2. Brief description
      3. Price (between $20-$200)
      4. Image URL (just use a placeholder like "https://placeholder.com/fashion-item-X")
      
      Format as JSON array with fields: name, description, price, image
    `

    // Generate recommendations
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    // Parse the JSON response
    let recommendations = []
    try {
      // Extract JSON from the response (it might be wrapped in markdown code blocks)
      const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/\[([\s\S]*?)\]/)
      const jsonText = jsonMatch ? jsonMatch[1] : text
      recommendations = JSON.parse(jsonText.includes("[") ? jsonText : `[${jsonText}]`)
    } catch (error) {
      console.error("Error parsing AI response:", error)
      // Fallback to dummy recommendations
      recommendations = [
        {
          name: "Classic White Sneakers",
          description: "Versatile white sneakers that go with any outfit",
          price: 79.99,
          image: "https://placeholder.com/fashion-item-1",
        },
        {
          name: "Slim Fit Jeans",
          description: "Dark wash denim with perfect stretch",
          price: 59.99,
          image: "https://placeholder.com/fashion-item-2",
        },
        {
          name: "Oversized Blazer",
          description: "Structured blazer for a polished look",
          price: 129.99,
          image: "https://placeholder.com/fashion-item-3",
        },
        {
          name: "Cashmere Sweater",
          description: "Soft, luxurious sweater for cooler days",
          price: 149.99,
          image: "https://placeholder.com/fashion-item-4",
        },
        {
          name: "Leather Crossbody Bag",
          description: "Compact yet spacious everyday bag",
          price: 89.99,
          image: "https://placeholder.com/fashion-item-5",
        },
      ]
    }

    // Save recommendations to database
    await Recommendation.create({
      userId: req.user._id,
      products: recommendations,
    })

    res.json(recommendations)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}
