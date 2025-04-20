"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '../context/CartContext'
import { toast } from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'

interface DeliveryAddress {
  fullName: string
  streetAddress: string
  city: string
  state: string
  zipCode: string
  phone: string
}

interface PaymentDetails {
  cardNumber: string
  expiryDate: string
  cvv: string
}

export default function CheckoutPage() {
  const router = useRouter()
  const { cartItems, clearCart } = useCart()
  const [currentStep, setCurrentStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [deliveryAddress, setDeliveryAddress] = useState<DeliveryAddress>({
    fullName: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    phone: ''
  })
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'googlepay'>('card')
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  })

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = 5.99
  const total = subtotal + shipping

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Validate all fields are filled
    if (Object.values(deliveryAddress).some(value => !value)) {
      toast.error('Please fill in all address fields')
      return
    }
    setCurrentStep(2)
  }

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (paymentMethod === 'card' && Object.values(paymentDetails).some(value => !value)) {
      toast.error('Please fill in all payment details')
      return
    }
    setCurrentStep(3)
  }

  const handlePlaceOrder = async () => {
    setIsProcessing(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Save order to localStorage
      const order = {
        id: Date.now(),
        items: cartItems,
        total,
        deliveryAddress,
        paymentMethod,
        status: 'Processing',
        date: new Date().toISOString()
      }
      
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]')
      localStorage.setItem('orders', JSON.stringify([...existingOrders, order]))
      
      // Clear cart and show success
      clearCart()
      setCurrentStep(4)
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`rounded-full h-8 w-8 flex items-center justify-center ${
                  currentStep >= step ? 'bg-pink-600 text-white' : 'bg-gray-200'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`h-1 w-24 ${
                    currentStep > step ? 'bg-pink-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            <span>Delivery</span>
            <span>Payment</span>
            <span>Confirm</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Delivery Address */}
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white p-8 rounded-lg shadow"
            >
              <h2 className="text-2xl font-semibold mb-6">Delivery Address</h2>
              <form onSubmit={handleAddressSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    value={deliveryAddress.fullName}
                    onChange={(e) => setDeliveryAddress({...deliveryAddress, fullName: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Street Address</label>
                  <input
                    type="text"
                    value={deliveryAddress.streetAddress}
                    onChange={(e) => setDeliveryAddress({...deliveryAddress, streetAddress: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">City</label>
                    <input
                      type="text"
                      value={deliveryAddress.city}
                      onChange={(e) => setDeliveryAddress({...deliveryAddress, city: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">State</label>
                    <input
                      type="text"
                      value={deliveryAddress.state}
                      onChange={(e) => setDeliveryAddress({...deliveryAddress, state: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">ZIP Code</label>
                    <input
                      type="text"
                      value={deliveryAddress.zipCode}
                      onChange={(e) => setDeliveryAddress({...deliveryAddress, zipCode: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                      type="tel"
                      value={deliveryAddress.phone}
                      onChange={(e) => setDeliveryAddress({...deliveryAddress, phone: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <button
                    type="submit"
                    className="bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-700"
                  >
                    Continue to Payment
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Step 2: Payment Method */}
          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white p-8 rounded-lg shadow"
            >
              <h2 className="text-2xl font-semibold mb-6">Payment Method</h2>
              <div className="space-y-4">
                <div className="flex space-x-4">
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`flex-1 p-4 border rounded-lg ${
                      paymentMethod === 'card' ? 'border-pink-600 bg-pink-50' : 'border-gray-200'
                    }`}
                  >
                    <h3 className="font-medium">Credit Card</h3>
                  </button>
                  <button
                    onClick={() => setPaymentMethod('googlepay')}
                    className={`flex-1 p-4 border rounded-lg ${
                      paymentMethod === 'googlepay' ? 'border-pink-600 bg-pink-50' : 'border-gray-200'
                    }`}
                  >
                    <h3 className="font-medium">Google Pay</h3>
                  </button>
                </div>

                {paymentMethod === 'card' && (
                  <form onSubmit={handlePaymentSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Card Number</label>
                      <input
                        type="text"
                        value={paymentDetails.cardNumber}
                        onChange={(e) => setPaymentDetails({...paymentDetails, cardNumber: e.target.value})}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                        <input
                          type="text"
                          value={paymentDetails.expiryDate}
                          onChange={(e) => setPaymentDetails({...paymentDetails, expiryDate: e.target.value})}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">CVV</label>
                        <input
                          type="text"
                          value={paymentDetails.cvv}
                          onChange={(e) => setPaymentDetails({...paymentDetails, cvv: e.target.value})}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                          placeholder="123"
                        />
                      </div>
                    </div>
                  </form>
                )}

                {paymentMethod === 'googlepay' && (
                  <div className="text-center p-4">
                    <p>You will be redirected to Google Pay</p>
                  </div>
                )}

                <div className="flex justify-between mt-6">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePaymentSubmit}
                    className="bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-700"
                  >
                    Continue to Review
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Order Review */}
          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white p-8 rounded-lg shadow"
            >
              <h2 className="text-2xl font-semibold mb-6">Review Order</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Delivery Address</h3>
                  <p className="text-gray-600">
                    {deliveryAddress.fullName}<br />
                    {deliveryAddress.streetAddress}<br />
                    {deliveryAddress.city}, {deliveryAddress.state} {deliveryAddress.zipCode}<br />
                    Phone: {deliveryAddress.phone}
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Payment Method</h3>
                  <p className="text-gray-600">
                    {paymentMethod === 'card' ? 'Credit Card' : 'Google Pay'}
                    {paymentMethod === 'card' && ` ending in ${paymentDetails.cardNumber.slice(-4)}`}
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Order Summary</h3>
                  <div className="space-y-2">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between">
                        <span>{item.name} x {item.quantity}</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                    <div className="border-t pt-2">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span>${shipping.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-semibold mt-2">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-6">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className={`bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-700 ${
                      isProcessing ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isProcessing ? 'Processing...' : 'Place Order'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4: Order Confirmation */}
          {currentStep === 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-8 rounded-lg shadow text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center"
              >
                <svg
                  className="w-8 h-8 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </motion.div>
              <h2 className="text-2xl font-semibold mb-2">Order Placed Successfully!</h2>
              <p className="text-gray-600 mb-6">
                Thank you for your purchase. Your order will be delivered soon.
              </p>
              <button
                onClick={() => router.push('/orders')}
                className="bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-700"
              >
                View Orders
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
} 