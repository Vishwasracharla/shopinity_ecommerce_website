"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { toast } from 'react-hot-toast'

const menProducts = [
  // Shirts
  {
    id: 1,
    name: 'Classic Fit Dress Shirt',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4',
    brand: 'Premium Wear',
    category: 'Shirts'
  },
  {
    id: 2,
    name: 'Oxford Button-Down Shirt',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c',
    brand: 'Premium Wear',
    category: 'Shirts'
  },
  {
    id: 3,
    name: 'Striped Business Shirt',
    price: 54.99,
    image: 'https://images.unsplash.com/photo-1608030609295-a581b8f46672',
    brand: 'Fashion Elite',
    category: 'Shirts'
  },
  {
    id: 4,
    name: 'Casual Linen Shirt',
    price: 45.99,
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f',
    brand: 'Comfort Plus',
    category: 'Shirts'
  },
  {
    id: 5,
    name: 'Slim Fit Formal Shirt',
    price: 64.99,
    image: 'https://images.unsplash.com/photo-1563630423918-b58f07336ac9',
    brand: 'Premium Wear',
    category: 'Shirts'
  },
  
  // Jeans
  {
    id: 6,
    name: 'Slim Fit Jeans',
    price: 69.99,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d',
    brand: 'Denim Co',
    category: 'Pants'
  },
  {
    id: 7,
    name: 'Straight Cut Dark Jeans',
    price: 74.99,
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246',
    brand: 'Denim Co',
    category: 'Pants'
  },
  {
    id: 8,
    name: 'Relaxed Fit Light Wash Jeans',
    price: 64.99,
    image: 'https://images.unsplash.com/photo-1602293589930-45aad59ba3ab',
    brand: 'Denim Co',
    category: 'Pants'
  },

  // Shoes
  {
    id: 9,
    name: 'Sports Running Shoes',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
    brand: 'SportFlex',
    category: 'Footwear'
  },
  {
    id: 10,
    name: 'Classic Leather Oxfords',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509',
    brand: 'FootFashion',
    category: 'Footwear'
  },
  {
    id: 11,
    name: 'Casual Sneakers',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77',
    brand: 'SportFlex',
    category: 'Footwear'
  },
  {
    id: 12,
    name: 'Formal Derby Shoes',
    price: 119.99,
    image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509',
    brand: 'FootFashion',
    category: 'Footwear'
  },
  {
    id: 13,
    name: 'Athletic Training Shoes',
    price: 94.99,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa',
    brand: 'SportFlex',
    category: 'Footwear'
  },

  // Bags
  {
    id: 14,
    name: 'Leather Messenger Bag',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1563904092230-7ec217b65fe2',
    brand: 'AccessoryPro',
    category: 'Bags'
  },
  {
    id: 15,
    name: 'Canvas Backpack',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62',
    brand: 'AccessoryPro',
    category: 'Bags'
  },

  // Belts
  {
    id: 16,
    name: 'Classic Leather Belt',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc',
    brand: 'AccessoryPro',
    category: 'Accessories'
  },
  {
    id: 17,
    name: 'Reversible Dress Belt',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc',
    brand: 'AccessoryPro',
    category: 'Accessories'
  },

  // Additional Categories
  {
    id: 18,
    name: 'Casual Blazer',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1598808503746-f34c53b9323e',
    brand: 'Fashion Elite',
    category: 'Outerwear'
  },
  {
    id: 19,
    name: 'Cotton T-Shirt Pack',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820',
    brand: 'Basics',
    category: 'T-Shirts'
  }
]

export default function MenPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const filteredProducts = selectedCategory === 'All' 
    ? menProducts 
    : menProducts.filter(product => product.category === selectedCategory)

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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Men's Collection</h1>
        
        {/* Categories */}
        <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
          {['All', 'Shirts', 'Pants', 'Footwear', 'Bags', 'Accessories', 'Outerwear', 'T-Shirts'].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-sm font-medium rounded-md shadow-sm transition-colors
                ${selectedCategory === category 
                  ? 'bg-pink-600 text-white' 
                  : 'text-gray-700 bg-white hover:bg-gray-50'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
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