"use client"

import { useState, useEffect, useContext } from "react"
import axios from "axios"
import { AuthContext } from "../context/AuthContext"
import { CartContext } from "../context/CartContext"
import Loader from "../components/ui/Loader"
import Message from "../components/ui/Message"
import { toast } from "react-toastify"

const RecommendPage = () => {
  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [generating, setGenerating] = useState(false)

  const { userInfo } = useContext(AuthContext)
  const { addToCart } = useContext(CartContext)

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true)
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
        const { data } = await axios.get("/api/recommend", config)
        setRecommendations(data)
        setLoading(false)
      } catch (error) {
        setError(error.response && error.response.data.message ? error.response.data.message : error.message)
        setLoading(false)
      }
    }

    fetchRecommendations()
  }, [userInfo])

  const generateRecommendations = async () => {
    try {
      setGenerating(true)
      setError(null)

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      // Force refresh by adding a timestamp parameter
      const { data } = await axios.get(`/api/recommend?refresh=${Date.now()}`, config)

      setRecommendations(data)
      setGenerating(false)
      toast.success("New recommendations generated!")
    } catch (error) {
      setError(error.response && error.response.data.message ? error.response.data.message : error.message)
      setGenerating(false)
    }
  }

  const addToCartHandler = (product) => {
    addToCart({
      _id: product._id || `rec_${Math.random().toString(36).substr(2, 9)}`,
      name: product.name,
      image: product.image,
      price: product.price,
      stock: 10, // Assuming these are always in stock
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-3xl font-bold text-center text-secondary-dark mb-4">AI-Powered Recommendations</h1>
        <p className="text-center text-gray-600 max-w-2xl mb-6">
          Based on your browsing history and preferences, our AI has curated these personalized fashion recommendations
          just for you.
        </p>
        <button
          onClick={generateRecommendations}
          disabled={generating}
          className="bg-primary text-white py-2 px-6 rounded-md hover:bg-primary-dark transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {generating ? "Generating..." : "Get New Suggestions"}
        </button>
      </div>

      {loading || generating ? (
        <Loader />
      ) : error ? (
        <Message variant="error">{error}</Message>
      ) : recommendations.length === 0 ? (
        <Message>No recommendations available. Try generating new ones!</Message>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recommendations.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-64 object-cover" />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-secondary-dark mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-4 text-sm line-clamp-3">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-secondary-dark">
                    ${typeof product.price === "number" ? product.price.toFixed(2) : product.price}
                  </span>
                  <button
                    onClick={() => addToCartHandler(product)}
                    className="bg-primary text-white py-1 px-4 rounded-md hover:bg-primary-dark transition-colors text-sm"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default RecommendPage
