"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

interface OrderItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
  brand: string
}

interface Order {
  id: number
  items: OrderItem[]
  total: number
  deliveryAddress: {
    fullName: string
    streetAddress: string
    city: string
    state: string
    zipCode: string
    phone: string
  }
  paymentMethod: 'card' | 'googlepay'
  status: string
  date: string
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      const savedOrders = localStorage.getItem('orders')
      if (savedOrders) {
        const parsedOrders = JSON.parse(savedOrders)
        // Validate order structure
        const validOrders = parsedOrders.filter((order: any) => {
          return order && 
                 order.id && 
                 order.items && 
                 Array.isArray(order.items) && 
                 order.deliveryAddress &&
                 order.deliveryAddress.fullName &&
                 order.total &&
                 order.date
        })
        setOrders(validOrders)
      }
    } catch (error) {
      console.error('Error loading orders:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
        <p className="mt-4 text-gray-600">Loading orders...</p>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold mb-4">No orders yet</h1>
        <Link href="/products" className="text-pink-600 hover:text-pink-700">
          Start Shopping
        </Link>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    } catch (error) {
      return 'Invalid date'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold mb-8">My Orders</h1>
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-lg font-semibold">Order #{order.id}</h2>
                    <p className="text-sm text-gray-500">
                      Placed on {formatDate(order.date)}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {order.status || 'Processing'}
                    </span>
                  </div>
                </div>

                <div className="border-t border-b border-gray-200 py-4 my-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Items</h3>
                  <div className="space-y-4">
                    {order.items?.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <h4 className="text-sm font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-500">{item.brand}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-sm font-medium">
                          ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {order.deliveryAddress && (
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-2">Delivery Address</h3>
                      <p className="text-sm text-gray-500">
                        {order.deliveryAddress.fullName}<br />
                        {order.deliveryAddress.streetAddress}<br />
                        {order.deliveryAddress.city}, {order.deliveryAddress.state} {order.deliveryAddress.zipCode}<br />
                        Phone: {order.deliveryAddress.phone}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-2">Payment Details</h3>
                      <p className="text-sm text-gray-500">
                        Method: {order.paymentMethod === 'card' ? 'Credit Card' : 'Google Pay'}<br />
                        Total: ${order.total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 