"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import ProductCard from "../components/ui/ProductCard"
import Loader from "../components/ui/Loader"
import Message from "../components/ui/Message"
import Paginate from "../components/ui/Paginate"

const HomePage = () => {
  const { keyword, pageNumber = 1 } = useParams()

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])
  const [filters, setFilters] = useState({
    category: "",
    brand: "",
    price: "",
    rating: "",
    sort: "",
  })

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)

        // Build query string from filters
        const queryParams = new URLSearchParams()
        if (keyword) queryParams.append("keyword", keyword)
        if (pageNumber) queryParams.append("pageNumber", pageNumber)
        if (filters.category) queryParams.append("category", filters.category)
        if (filters.brand) queryParams.append("brand", filters.brand)
        if (filters.price) queryParams.append("price", filters.price)
        if (filters.rating) queryParams.append("rating", filters.rating)
        if (filters.sort) queryParams.append("sort", filters.sort)

        const { data } = await axios.get(`/api/products?${queryParams.toString()}`)

        setProducts(data.products)
        setPage(data.page)
        setPages(data.pages)
        setLoading(false)
      } catch (error) {
        setError(error.response && error.response.data.message ? error.response.data.message : error.message)
        setLoading(false)
      }
    }

    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("/api/products/categories")
        setCategories(data)
      } catch (error) {
        console.error("Error fetching categories:", error)
      }
    }

    const fetchBrands = async () => {
      try {
        const { data } = await axios.get("/api/products/brands")
        setBrands(data)
      } catch (error) {
        console.error("Error fetching brands:", error)
      }
    }

    fetchProducts()
    fetchCategories()
    fetchBrands()
  }, [keyword, pageNumber, filters])

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const clearFilters = () => {
    setFilters({
      category: "",
      brand: "",
      price: "",
      rating: "",
      sort: "",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-secondary-dark">
        {keyword ? `Search Results for "${keyword}"` : "Latest Products"}
      </h1>

      <div className="flex flex-col md:flex-row">
        {/* Filters Sidebar */}
        <div className="w-full md:w-1/4 mb-6 md:mb-0 md:pr-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-secondary-dark">Filters</h2>
              <button onClick={clearFilters} className="text-sm text-primary hover:text-primary-dark">
                Clear All
              </button>
            </div>

            {/* Category Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-secondary-dark mb-2">Category</label>
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Brand Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-secondary-dark mb-2">Brand</label>
              <select
                name="brand"
                value={filters.brand}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="">All Brands</option>
                {brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-secondary-dark mb-2">Price Range</label>
              <select
                name="price"
                value={filters.price}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="">All Prices</option>
                <option value="0-50">Under $50</option>
                <option value="50-100">$50 - $100</option>
                <option value="100-200">$100 - $200</option>
                <option value="200-500">$200 - $500</option>
                <option value="500-1000">$500 - $1000</option>
                <option value="1000-10000">Over $1000</option>
              </select>
            </div>

            {/* Rating Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-secondary-dark mb-2">Rating</label>
              <select
                name="rating"
                value={filters.rating}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="">All Ratings</option>
                <option value="4">4★ & Above</option>
                <option value="3">3★ & Above</option>
                <option value="2">2★ & Above</option>
                <option value="1">1★ & Above</option>
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-secondary-dark mb-2">Sort By</label>
              <select
                name="sort"
                value={filters.sort}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="">Relevance</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="w-full md:w-3/4">
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="error">{error}</Message>
          ) : (
            <>
              {products.length === 0 ? (
                <Message>No products found</Message>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              )}
              <Paginate pages={pages} page={page} keyword={keyword ? keyword : ""} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default HomePage
