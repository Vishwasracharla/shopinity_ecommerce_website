import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const PaymentPage = () => {
  const { savePaymentMethod } = useContext(CartContext);
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const submitHandler = (e) => {
    e.preventDefault();
    savePaymentMethod(paymentMethod);
    navigate('/placeorder');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Payment Method
        </h2>
        <form onSubmit={submitHandler}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Select Method
            </label>
            <div className="mt-2 space-y-4">
              <div className="flex items-center">
                <input
                  id="PayPal"
                  name="paymentMethod"
                  type="radio"
                  value="PayPal"
                  checked={paymentMethod === 'PayPal'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="PayPal" className="ml-3 block text-gray-700">
                  PayPal or Credit Card
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="Stripe"
                  name="paymentMethod"
                  type="radio"
                  value="Stripe"
                  checked={paymentMethod === 'Stripe'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="Stripe" className="ml-3 block text-gray-700">
                  Stripe
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="CashOnDelivery"
                  name="paymentMethod"
                  type="radio"
                  value="CashOnDelivery"
                  checked={paymentMethod === 'CashOnDelivery'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="CashOnDelivery" className="ml-3 block text-gray-700">
                  Cash on Delivery
                </label>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage; 