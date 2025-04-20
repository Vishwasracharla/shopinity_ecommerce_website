"use client"

import React from 'react'
import { useAuth } from '../context/AuthContext'
import Link from 'next/link'

export default function ProfilePage() {
  const { user, logout } = useAuth()

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <p className="text-gray-500 mb-4">Please log in to view your profile</p>
            <Link href="/login" className="inline-block bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-700 transition-colors">
              Login
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h1>
            
            <div className="space-y-6">
              {/* Profile Information */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Account Information</h2>
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Name</p>
                      <p className="mt-1 text-sm text-gray-900">{user.name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p className="mt-1 text-sm text-gray-900">{user.email}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Links</h2>
                <div className="space-y-2">
                  <Link 
                    href="/orders" 
                    className="block p-3 bg-gray-50 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    My Orders
                  </Link>
                  <Link 
                    href="/wishlist" 
                    className="block p-3 bg-gray-50 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    My Wishlist
                  </Link>
                  <Link 
                    href="/cart" 
                    className="block p-3 bg-gray-50 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    My Cart
                  </Link>
                </div>
              </div>

              {/* Account Actions */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Account Actions</h2>
                <div className="space-y-3">
                  <button
                    onClick={logout}
                    className="w-full px-4 py-2 text-sm font-medium text-white bg-pink-600 rounded-md hover:bg-pink-700 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 