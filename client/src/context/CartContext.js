"use client"

import React, { createContext, useState, useEffect, useContext } from "react"
import axios from "axios"
import { AuthContext } from "./AuthContext"
import { toast } from "react-toastify"

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const { userInfo } = useContext(AuthContext)
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems")
    return savedCart ? JSON.parse(savedCart) : []
  })
  const [shippingAddress, setShippingAddress] = useState(
    localStorage.getItem("shippingAddress") ? JSON.parse(localStorage.getItem("shippingAddress")) : {},
  )
  const [paymentMethod, setPaymentMethod] = useState(
    localStorage.getItem("paymentMethod") ? JSON.parse(localStorage.getItem("paymentMethod")) : "",
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Update localStorage when cart changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
  }, [cartItems])

  // Update localStorage when shipping address changes
  useEffect(() => {
    localStorage.setItem("shippingAddress", JSON.stringify(shippingAddress))
  }, [shippingAddress])

  // Update localStorage when payment method changes
  useEffect(() => {
    localStorage.setItem("paymentMethod", JSON.stringify(paymentMethod))
  }, [paymentMethod])

  // Fetch cart from server if user is logged in
  useEffect(() => {
    const fetchCart = async () => {
      if (userInfo) {
        try {
          setLoading(true)
          const config = {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }

          const { data } = await axios.get("/api/cart", config)

          if (data.products && data.products.length > 0) {
            const serverCartItems = data.products.map((item) => ({
              product: item.productId._id,
              name: item.productId.name,
              image: item.productId.image,
              price: item.productId.discountPrice || item.productId.price,
              stock: item.productId.stock,
              quantity: item.quantity,
            }))

            setCartItems(serverCartItems)
          }

          setLoading(false)
        } catch (error) {
          setError(error.response && error.response.data.message ? error.response.data.message : error.message)
          setLoading(false)
        }
      }
    }

    fetchCart()
  }, [userInfo])

  // Add to cart
  const addToCart = async (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.product === product._id)
      if (existingItem) {
        return prevItems.map(item =>
          item.product === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prevItems, { ...product, quantity }]
    })

    // If user is logged in, update cart on server
    if (userInfo) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        }

        await axios.post("/api/cart", { productId: product._id, quantity }, config)
      } catch (error) {
        toast.error("Error updating cart on server")
      }
    }

    toast.success(`Added ${product.name} to cart`)
  }

  // Remove from cart
  const removeFromCart = async (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.product !== productId))

    // If user is logged in, update cart on server
    if (userInfo) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }

        await axios.delete(`/api/cart/${productId}`, config)
      } catch (error) {
        toast.error("Error removing item from cart on server")
      }
    }
  }

  // Update cart quantity
  const updateQuantity = async (productId, quantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.product === productId ? { ...item, quantity } : item
      )
    )

    // If user is logged in, update cart on server
    if (userInfo) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        }

        await axios.put(`/api/cart/${productId}`, { quantity }, config)
      } catch (error) {
        toast.error("Error updating cart on server")
      }
    }
  }

  // Save shipping address
  const saveShippingAddress = (data) => {
    setShippingAddress(data)
  }

  // Save payment method
  const savePaymentMethod = (data) => {
    setPaymentMethod(data)
  }

  // Clear cart
  const clearCart = () => {
    setCartItems([])
    localStorage.removeItem("cartItems")
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        shippingAddress,
        paymentMethod,
        loading,
        error,
        addToCart,
        removeFromCart,
        updateQuantity,
        saveShippingAddress,
        savePaymentMethod,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
