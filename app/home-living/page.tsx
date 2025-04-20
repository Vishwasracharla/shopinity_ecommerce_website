"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { toast } from 'react-hot-toast'

const homeLivingProducts = [
  {
    id: 16,
    name: 'Luxury Bedding Set',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af',
    brand: 'HomeComfort',
    category: 'Bedding'
  },
  {
    id: 17,
    name: 'Modern Table Lamp',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c',
    brand: 'LightLux',
    category: 'Lighting'
  },
  {
    id: 18,
    name: 'Decorative Throw Pillows',
    price: 44.99,
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2',
    brand: 'CozyCraft',
    category: 'Decor'
  },
  {
    id: 19,
    name: 'Kitchen Utensil Set',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1585515320310-259814833e62',
    brand: 'ChefChoice',
    category: 'Kitchen'
  },
  {
    id: 5,
    name: 'Bathroom Organizer',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea',
    brand: 'OrganizeIt',
    category: 'Storage'
  },
  {
    id: 6,
    name: 'Indoor Plant Set',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1545241047-6083a3684587',
    brand: 'GreenHome',
    category: 'Plants'
  },
  {
    id: 7,
    name: 'Geometric Wall Art',
    price: 69.99,
    image: 'https://images.unsplash.com/photo-1506377295352-e3154d43ea9e',
    brand: 'ArtHome',
    category: 'Decor'
  },
  {
    id: 8,
    name: 'Woven Cotton Rug',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1600166898405-da9535204843',
    brand: 'HomeComfort',
    category: 'Decor'
  },
  {
    id: 9,
    name: 'Pendant Light Fixture',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89',
    brand: 'LightLux',
    category: 'Lighting'
  }
]

export default function HomeLivingPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const categories = ['All', 'Bedding', 'Lighting', 'Decor', 'Kitchen', 'Storage', 'Plants']

  const filteredProducts = selectedCategory === 'All' 
    ? homeLivingProducts 
    : homeLivingProducts.filter(product => product.category === selectedCategory)

  const handleAddToCart = (product: any) => {
    addToCart(product)
    toast.success(`${product.name} added to cart!`)
  }

  const handleWishlistClick = (product: any) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
      toast.success(`${product.name} removed from wishlist`)
    } else {
      addToWishlist(product)
      toast.success(`${product.name} added to wishlist`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Home & Living Collection</h1>
        
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${selectedCategory === category
                  ? 'bg-pink-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden group">
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover group-hover:scale-110 transition-transform duration-200"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <button
                  onClick={() => handleWishlistClick(product)}
                  className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-6 w-6 ${
                      isInWishlist(product.id) ? 'text-red-500' : 'text-gray-400'
                    }`}
                    fill={isInWishlist(product.id) ? 'currentColor' : 'none'}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.brand}</p>
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-lg font-bold text-gray-900">${product.price}</p>
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="px-4 py-2 text-sm font-medium text-white bg-pink-600 rounded-md hover:bg-pink-700 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 