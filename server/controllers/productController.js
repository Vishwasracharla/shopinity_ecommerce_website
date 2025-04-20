import Product from "../models/Product.js"

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const pageSize = 10
    const page = Number(req.query.pageNumber) || 1

    const category = req.query.category ? { category: req.query.category } : {}
    const brand = req.query.brand ? { brand: req.query.brand } : {}
    const priceRange = req.query.price
      ? {
          price: {
            $gte: Number(req.query.price.split("-")[0]),
            $lte: Number(req.query.price.split("-")[1]),
          },
        }
      : {}
    const rating = req.query.rating ? { rating: { $gte: Number(req.query.rating) } } : {}

    const sortOption = {}
    if (req.query.sort === "price-asc") {
      sortOption.price = 1
    } else if (req.query.sort === "price-desc") {
      sortOption.price = -1
    } else if (req.query.sort === "newest") {
      sortOption.createdAt = -1
    }

    const count = await Product.countDocuments({ ...category, ...brand, ...priceRange, ...rating })
    const products = await Product.find({ ...category, ...brand, ...priceRange, ...rating })
      .sort(sortOption)
      .limit(pageSize)
      .skip(pageSize * (page - 1))

    res.json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
      count,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)

    if (product) {
      res.json(product)
    } else {
      res.status(404).json({ message: "Product not found" })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res) => {
  try {
    const { name, image, brand, category, description, price, discountPrice, stock, rating, numReviews } = req.body

    const product = new Product({
      name,
      image,
      brand,
      category,
      description,
      price,
      discountPrice,
      stock,
      rating,
      numReviews,
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {
  try {
    const { name, image, brand, category, description, price, discountPrice, stock, rating, numReviews } = req.body

    const product = await Product.findById(req.params.id)

    if (product) {
      product.name = name || product.name
      product.image = image || product.image
      product.brand = brand || product.brand
      product.category = category || product.category
      product.description = description || product.description
      product.price = price || product.price
      product.discountPrice = discountPrice || product.discountPrice
      product.stock = stock || product.stock
      product.rating = rating || product.rating
      product.numReviews = numReviews || product.numReviews

      const updatedProduct = await product.save()
      res.json(updatedProduct)
    } else {
      res.status(404).json({ message: "Product not found" })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)

    if (product) {
      await product.deleteOne()
      res.json({ message: "Product removed" })
    } else {
      res.status(404).json({ message: "Product not found" })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

// @desc    Search products
// @route   GET /api/products/search
// @access  Public
export const searchProducts = async (req, res) => {
  try {
    const keyword = req.query.q
      ? {
          $or: [
            { name: { $regex: req.query.q, $options: "i" } },
            { brand: { $regex: req.query.q, $options: "i" } },
            { category: { $regex: req.query.q, $options: "i" } },
          ],
        }
      : {}

    const products = await Product.find({ ...keyword })
    res.json(products)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}
