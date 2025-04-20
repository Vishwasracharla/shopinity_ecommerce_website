"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

interface WishlistItem {
  id: number
  name: string
  price: number
  image: string
  brand: string
}

interface WishlistContextType {
  wishlistItems: WishlistItem[]
  addToWishlist: (product: any) => void
  removeFromWishlist: (productId: number) => void
  isInWishlist: (productId: number) => boolean
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist')
    if (savedWishlist) {
      setWishlistItems(JSON.parse(savedWishlist))
    }
  }, [])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems))
  }, [wishlistItems])

  const addToWishlist = (product: any) => {
    const isAlreadyInWishlist = wishlistItems.some(item => item.id === product.id)
    
    if (isAlreadyInWishlist) {
      toast.error(`${product.name} is already in your wishlist!`)
      return
    }

    setWishlistItems(prevItems => [...prevItems, product])
    toast.success(`${product.name} added to wishlist!`)
  }

  const removeFromWishlist = (productId: number) => {
    const item = wishlistItems.find(item => item.id === productId)
    setWishlistItems(prevItems => prevItems.filter(item => item.id !== productId))
    
    if (item) {
      toast.success(`${item.name} removed from wishlist!`)
    }
  }

  const isInWishlist = (productId: number) => {
    return wishlistItems.some(item => item.id === productId)
  }

  return (
    <WishlistContext.Provider value={{
      wishlistItems,
      addToWishlist,
      removeFromWishlist,
      isInWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
} 