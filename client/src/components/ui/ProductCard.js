"use client"

import { useContext } from "react"
import { Link } from "react-router-dom"
import { FaHeart, FaRegHeart } from "react-icons/fa"
import Rating from "./Rating"
import { AuthContext } from "../../context/AuthContext"
import axios from "axios"
import { toast } from "react-toastify"

const ProductCard = ({ product, inWishlist = false, onWishlistChange }) => {
  const { userInfo } = useContext(AuthContext)

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
        await axios.delete(`/api/users/wishlist/${product._id}`, config)
        toast.success("Removed from wishlist")
      } else {
        await axios.post("/api/users/wishlist", { productId: product._id }, config)
        toast.success("Added to wishlist")
      }

      if (onWishlistChange) {
        onWishlistChange()
      }
    } catch (error) {
      toast.error("Error updating wishlist")
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/product/${product._id}`}>
        <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-64 object-cover" />
      </Link>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/product/${product._id}`}>
            <h2 className="text-lg font-semibold text-secondary-dark truncate">{product.name}</h2>
          </Link>
          <button
            onClick={toggleWishlist}
            className="text-primary hover:text-primary-dark"
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            {inWishlist ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>
        <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
        <div className="flex items-center mb-2">
          <Rating value={product.rating} text={`${product.numReviews} reviews`} />
        </div>
        <div className="flex items-center">
          {product.discountPrice ? (
            <>
              <span className="text-lg font-bold text-secondary-dark">${product.discountPrice.toFixed(2)}</span>
              <span className="ml-2 text-sm text-gray-500 line-through">${product.price.toFixed(2)}</span>
              <span className="ml-2 text-sm text-green-600">
                {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-secondary-dark">${product.price.toFixed(2)}</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductCard
