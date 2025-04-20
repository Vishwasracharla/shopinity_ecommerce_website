"use client"

import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FaTrash } from "react-icons/fa"
import { CartContext } from "../context/CartContext"
import { AuthContext } from "../context/AuthContext"
import Message from "../components/ui/Message"

const CartPage = () => {
  const { cartItems, removeFromCart, updateCartQuantity } = useContext(CartContext)
  const { userInfo } = useContext(AuthContext)
  const navigate = useNavigate()

  const checkoutHandler = () => {
    if (!userInfo) {
      navigate("/login?redirect=shipping")
    } else {
      navigate("/shipping")
    }
  }

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

  const shippingPrice = subtotal > 100 ? 0 : 10
  const taxPrice = Number((0.15 * subtotal).toFixed(2))
  const totalPrice = subtotal + shippingPrice + taxPrice

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-secondary-dark">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <Message>
          Your cart is empty.{" "}
          <Link to="/" className="text-primary hover:underline">
            Go Back
          </Link>
        </Message>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 border-b">
                <h2 className="text-xl font-semibold text-secondary-dark">
                  Cart Items ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
                </h2>
              </div>
              <ul className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <li key={item.product} className="p-4 flex flex-col sm:flex-row sm:items-center">
                    <div className="flex items-center mb-4 sm:mb-0 sm:w-1/2">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <Link to={`/product/${item.product}`} className="ml-4 text-secondary-dark hover:text-primary">
                        {item.name}
                      </Link>
                    </div>
                    <div className="flex items-center justify-between sm:w-1/2">
                      <div className="flex items-center">
                        <span className="text-secondary-dark mr-2">${item.price.toFixed(2)}</span>
                        <select
                          value={item.quantity}
                          onChange={(e) => updateCartQuantity(item.product, Number(e.target.value))}
                          className="p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                        >
                          {[...Array(Math.min(item.stock, 10)).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product)}
                        className="text-red-500 hover:text-red-700"
                        aria-label="Remove item"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 border-b">
                <h2 className="text-xl font-semibold text-secondary-dark">Order Summary</h2>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>
                    {shippingPrice === 0 ? "Free" : `$${shippingPrice.toFixed(2)}`}
                    {shippingPrice > 0 && (
                      <span className="block text-xs text-gray-500">(Free shipping on orders over $100)</span>
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (15%):</span>
                  <span>${taxPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-4">
                  <span>Total:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <button
                  onClick={checkoutHandler}
                  disabled={cartItems.length === 0}
                  className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartPage
