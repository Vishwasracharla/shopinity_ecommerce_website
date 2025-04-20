"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

interface Product {
  id: number
  name: string
  price: number
  image: string
  brand: string
  description: string
  category: string
}

interface ProductContextType {
  products: Product[]
  loading: boolean
  error: string | null
  setProducts: (products: Product[]) => void
  getProductById: (id: number) => Product | undefined
  filterProductsByCategory: (category: string) => Product[]
  searchProducts: (query: string) => Product[]
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Initial products load
    const fetchProducts = async () => {
      try {
        setLoading(true)
        // Replace this with your actual API call
        const response = await fetch('/api/products')
        const data = await response.json()
        setProducts(data)
        setError(null)
      } catch (err) {
        setError('Failed to fetch products')
        console.error('Error fetching products:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const getProductById = (id: number) => {
    return products.find(product => product.id === id)
  }

  const filterProductsByCategory = (category: string) => {
    return products.filter(product => 
      product.category.toLowerCase() === category.toLowerCase()
    )
  }

  const searchProducts = (query: string) => {
    const searchTerm = query.toLowerCase()
    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.brand.toLowerCase().includes(searchTerm)
    )
  }

  return (
    <ProductContext.Provider value={{
      products,
      loading,
      error,
      setProducts,
      getProductById,
      filterProductsByCategory,
      searchProducts
    }}>
      {children}
    </ProductContext.Provider>
  )
}

export function useProducts() {
  const context = useContext(ProductContext)
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider')
  }
  return context
} 