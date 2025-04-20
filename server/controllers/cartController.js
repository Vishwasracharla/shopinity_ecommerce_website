import Cart from "../models/Cart.js"
import Product from "../models/Product.js"

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate({
      path: "products.productId",
      select: "name image price discountPrice stock",
    })

    if (cart) {
      res.json(cart)
    } else {
      res.json({ userId: req.user._id, products: [] })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body

    // Check if product exists and has enough stock
    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }

    if (product.stock < quantity) {
      return res.status(400).json({ message: "Not enough stock available" })
    }

    let cart = await Cart.findOne({ userId: req.user._id })

    if (cart) {
      // Check if product already in cart
      const productIndex = cart.products.findIndex((p) => p.productId.toString() === productId)

      if (productIndex > -1) {
        // Product exists in cart, update quantity
        cart.products[productIndex].quantity += quantity
      } else {
        // Product not in cart, add it
        cart.products.push({ productId, quantity })
      }

      cart = await cart.save()
    } else {
      // No cart for user, create new cart
      cart = await Cart.create({
        userId: req.user._id,
        products: [{ productId, quantity }],
      })
    }

    res.status(201).json(cart)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

// @desc    Update cart item quantity
// @route   PUT /api/cart/:id
// @access  Private
export const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body
    const productId = req.params.id

    // Check if product exists and has enough stock
    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }

    if (product.stock < quantity) {
      return res.status(400).json({ message: "Not enough stock available" })
    }

    const cart = await Cart.findOne({ userId: req.user._id })

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" })
    }

    const productIndex = cart.products.findIndex((p) => p.productId.toString() === productId)

    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not in cart" })
    }

    cart.products[productIndex].quantity = quantity
    await cart.save()

    res.json(cart)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

// @desc    Remove item from cart
// @route   DELETE /api/cart/:id
// @access  Private
export const removeFromCart = async (req, res) => {
  try {
    const productId = req.params.id
    const cart = await Cart.findOne({ userId: req.user._id })

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" })
    }

    cart.products = cart.products.filter((p) => p.productId.toString() !== productId)

    await cart.save()
    res.json(cart)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}
