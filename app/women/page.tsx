"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { toast } from 'react-hot-toast'

const womenProducts = [
  // Dresses
  {
    id: 1,
    name: 'Floral Summer Dress',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1572804013427-4d7ca7268217',
    brand: 'Fashion Nova',
    category: 'Dresses'
  },
  {
    id: 2,
    name: 'Elegant Evening Gown',
    price: 159.99,
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae',
    brand: 'Fashion Nova',
    category: 'Dresses'
  },
  {
    id: 3,
    name: 'Casual Maxi Dress',
    price: 69.99,
    image: 'https://images.unsplash.com/photo-1495385794356-15371f348c31',
    brand: 'Fashion Nova',
    category: 'Dresses'
  },
  {
    id: 4,
    name: 'Cocktail Party Dress',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8',
    brand: 'Fashion Nova',
    category: 'Dresses'
  },

  // Activewear
  {
    id: 5,
    name: 'High-Waist Yoga Pants',
    price: 54.99,
    image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8',
    brand: 'ActiveFit',
    category: 'Activewear'
  },

  // Tops
  {
    id: 6,
    name: 'Oversized T-shirt',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8',
    brand: 'Trendy',
    category: 'Tops'
  },
  {
    id: 7,
    name: 'Casual T-Shirt',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27',
    brand: 'Trendy',
    category: 'Tops'
  },
  {
    id: 8,
    name: 'Off-Shoulder Top',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03',
    brand: 'Trendy',
    category: 'Tops'
  },

  // Footwear
  {
    id: 9,
    name: 'Ankle Boots',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2',
    brand: 'FootFashion',
    category: 'Footwear'
  },
  {
    id: 10,
    name: 'Classic Pumps',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1573100925118-870b8efc799d',
    brand: 'FootFashion',
    category: 'Footwear'
  },

  // Accessories
  {
    id: 11,
    name: 'Designer Handbag',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa',
    brand: 'LuxStyle',
    category: 'Accessories'
  },
  {
    id: 12,
    name: 'Leather Tote Bag',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e',
    brand: 'LuxStyle',
    category: 'Accessories'
  },
  {
    id: 13,
    name: 'Crossbody Bag',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c',
    brand: 'LuxStyle',
    category: 'Accessories'
  },

  // Jewelry
  {
    id: 14,
    name: 'Statement Necklace',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338',
    brand: 'GlamJewels',
    category: 'Jewelry'
  },
  {
    id: 15,
    name: 'Gold Bracelet Set',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a',
    brand: 'GlamJewels',
    category: 'Jewelry'
  },
  {
    id: 16,
    name: 'Pearl Earrings',
    price: 44.99,
    image: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236',
    brand: 'GlamJewels',
    category: 'Jewelry'
  },
  {
    id: 17,
    name: 'Diamond Ring',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e',
    brand: 'GlamJewels',
    category: 'Jewelry'
  }
]

export default function WomenPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const categories = ['All', 'Dresses', 'Tops', 'Activewear', 'Footwear', 'Accessories', 'Jewelry']

  const filteredProducts = selectedCategory === 'All' 
    ? womenProducts 
    : womenProducts.filter(product => product.category === selectedCategory)

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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Women's Collection</h1>
        
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