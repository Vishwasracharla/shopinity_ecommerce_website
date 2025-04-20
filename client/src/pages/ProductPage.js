"use client"

import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { FaHeart, FaRegHeart, FaArrowLeft } from "react-icons/fa"
import axios from "axios"
import { CartContext } from "../context/CartContext"
import { AuthContext } from "../context/AuthContext"
import Rating from "../components/ui/Rating"
import Loader from "../components/ui/Loader"
import Message from "../components/ui/Message"
import { toast } from "react-toastify"

const ProductPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [inWishlist, setInWishlist] = useState(false)

  const { addToCart } = useContext(CartContext)
  const { userInfo } = useContext(AuthContext)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const { data } = await axios.get(`/api/products/${id}`)
        setProduct(data)
        setLoading(false)
      } catch (error) {
        setError(error.response && error.response.data.message ? error.response.data.message : error.message)
        setLoading(false)
      }
    }

    const checkWishlist = async () => {
      if (userInfo) {
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
          const { data } = await axios.get("/api/users/wishlist", config)
          setInWishlist(data.some((item) => item._id === id))
        } catch (error) {
          console.error("Error checking wishlist:", error)
        }
      }
    }

    fetchProduct()
    checkWishlist()
  }, [id, userInfo])

  const toggleWishlist = async () => {
    if (!userInfo) {
      toast.error("Please login to add items to wishlist")
      return
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      if (inWishlist) {
        await axios.delete(`/api/users/wishlist/${id}`, config)
        toast.success("Removed from wishlist")
        setInWishlist(false)
      } else {
        await axios.post("/api/users/wishlist", { productId: id }, config)
        toast.success("Added to wishlist")
        setInWishlist(true)
      }
    } catch (error) {
      toast.error("Error updating wishlist")
    }
  }

  const addToCartHandler = () => {
    addToCart(product, quantity)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button onClick={() => navigate(-1)} className="flex items-center text-secondary-dark hover:text-primary mb-6">
        <FaArrowLeft className="mr-2" /> Go Back
      </button>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="error">{error}</Message>
      ) : product ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Product Details */}
          <div>
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-2xl font-bold text-secondary-dark">{product.name}</h1>
                <button
                  onClick={toggleWishlist}
                  className="text-primary hover:text-primary-dark text-xl"
                  aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
                >
                  {inWishlist ? <FaHeart /> : <FaRegHeart />}
                </button>
              </div>
              <p className="text-gray-500 mb-4">{product.brand}</p>
              <div className="mb-4">
                <Rating value={product.rating} text={`${product.numReviews} reviews`} />
              </div>
              <div className="mb-4">
                {product.discountPrice ? (
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-secondary-dark">${product.discountPrice.toFixed(2)}</span>
                    <span className="ml-2 text-gray-500 line-through">${product.price.toFixed(2)}</span>
                    <span className="ml-2 text-sm text-green-600">
                      {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                    </span>
                  </div>
                ) : (
                  <span className="text-2xl font-bold text-secondary-dark">${product.price.toFixed(2)}</span>
                )}
              </div>
              <div className="border-t border-gray-200 pt-4">
                <p className="text-secondary-dark">{product.description}</p>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span>Price:</span>
                  <span className="font-bold">${(product.discountPrice || product.price).toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Status:</span>
                  <span className={product.stock > 0 ? "text-green-600" : "text-red-600"}>
                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
              </div>

              {product.stock > 0 && (
                <div className="mb-4">
                  <label htmlFor="quantity" className="block mb-2">
                    Quantity:
                  </label>
                  <select
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    {[...Array(Math.min(product.stock, 10)).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <button
                onClick={addToCartHandler}
                disabled={product.stock === 0}
                className="w-full bg-primary text-white py-3 px-4 rounded-md hover:bg-primary-dark transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Message>Product not found</Message>
      )}
    </div>
  )
}

export default ProductPage
