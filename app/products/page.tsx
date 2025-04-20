"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { toast } from 'react-hot-toast'

const allProducts = [
  // Men's Products
  {
    id: 1,
    name: 'Classic Fit Dress Shirt',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4',
    brand: 'Premium Wear',
    category: 'Men'
  },
  {
    id: 2,
    name: 'Oxford Button-Down Shirt',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c',
    brand: 'Premium Wear',
    category: 'Men'
  },
  {
    id: 3,
    name: 'Slim Fit Jeans',
    price: 69.99,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d',
    brand: 'Denim Co',
    category: 'Men'
  },
  {
    id: 4,
    name: 'Sports Running Shoes',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
    brand: 'SportFlex',
    category: 'Men'
  },
  {
    id: 5,
    name: 'Leather Messenger Bag',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1563904092230-7ec217b65fe2',
    brand: 'AccessoryPro',
    category: 'Men'
  },

  // Women's Products
  {
    id: 6,
    name: 'Floral Summer Dress',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1572804013427-4d7ca7268217',
    brand: 'Fashion Nova',
    category: 'Women'
  },
  {
    id: 7,
    name: 'Elegant Evening Gown',
    price: 159.99,
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae',
    brand: 'Fashion Nova',
    category: 'Women'
  },
  {
    id: 8,
    name: 'High-Waist Yoga Pants',
    price: 54.99,
    image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8',
    brand: 'ActiveFit',
    category: 'Women'
  },
  {
    id: 9,
    name: 'Designer Handbag',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa',
    brand: 'LuxStyle',
    category: 'Women'
  },
  {
    id: 10,
    name: 'Statement Necklace',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338',
    brand: 'GlamJewels',
    category: 'Women'
  },

  // Kids' Products
  {
    id: 11,
    name: 'Cool Graphic T-shirt',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42',
    brand: 'KidsWear',
    category: 'Kids'
  },
  {
    id: 12,
    name: 'Cartoon Print Hoodie',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1584270413639-d5ee397272cd',
    brand: 'KidsWear',
    category: 'Kids'
  },
  {
    id: 13,
    name: 'Light-up Sneakers',
    price: 44.99,
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86',
    brand: 'KidSteps',
    category: 'Kids'
  },
  {
    id: 14,
    name: 'Superhero Backpack',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1622560480654-d96214fdc887',
    brand: 'SchoolCool',
    category: 'Kids'
  },
  {
    id: 15,
    name: 'Night Dress',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5',
    brand: 'SleepyKids',
    category: 'Kids'
  },

  // Home & Living Products
  {
    id: 16,
    name: 'Luxury Bedding Set',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af',
    brand: 'HomeComfort',
    category: 'Home & Living'
  },
  {
    id: 17,
    name: 'Modern Table Lamp',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c',
    brand: 'LightLux',
    category: 'Home & Living'
  },
  {
    id: 18,
    name: 'Decorative Throw Pillows',
    price: 44.99,
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2',
    brand: 'CozyCraft',
    category: 'Home & Living'
  },
  {
    id: 19,
    name: 'Kitchen Utensil Set',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1585515320310-259814833e62',
    brand: 'ChefChoice',
    category: 'Home & Living'
  },
  {
    id: 20,
    name: 'Indoor Plant Set',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1545241047-6083a3684587',
    brand: 'GreenHome',
    category: 'Home & Living'
  }
]

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const categories = [
    {
      name: 'Men',
      image: '/images/photo-1617137968427-85924c800a22.jpeg',
      path: '/men'
    },
    {
      name: 'Women',
      image: '/images/7ed07dd0533c0e6e1ae94b82f9c0e233.jpg',
      path: '/women'
    },
    {
      name: 'Kids',
      image: '/images/pexels-photo-1620788.jpeg',
      path: '/kids'
    },
    {
      name: 'Home & Living',
      image: '/images/download.jpeg',
      path: '/home-living'
    }
  ]

  const filteredProducts = selectedCategory === 'All' 
    ? allProducts 
    : allProducts.filter(product => product.category === selectedCategory)

  const handleAddToCart = (product: any) => {
    addToCart(product)
    toast.success(`${product.name} added to cart!`)
  }

  const handleWishlistClick = (product: any) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shop By Category</h1>
        
        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {categories.map((category) => (
            <Link href={category.path} key={category.name}>
              <div className="relative h-64 rounded-lg overflow-hidden group cursor-pointer">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h2 className="text-2xl font-bold text-white">{category.name}</h2>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Filter Buttons */}
        <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-4 py-2 text-sm font-medium rounded-md shadow-sm transition-colors
              ${selectedCategory === 'All' 
                ? 'bg-pink-600 text-white' 
                : 'text-gray-700 bg-white hover:bg-gray-50'
              }`}
          >
            All Products
          </button>
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`px-4 py-2 text-sm font-medium rounded-md shadow-sm transition-colors
                ${selectedCategory === category.name 
                  ? 'bg-pink-600 text-white' 
                  : 'text-gray-700 bg-white hover:bg-gray-50'
                }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden group">
              <div className="relative h-64 w-full overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
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