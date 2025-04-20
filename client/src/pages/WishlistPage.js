import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loader from '../components/ui/Loader';
import Message from '../components/ui/Message';

const WishlistPage = () => {
  const { userInfo } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        const { data } = await axios.get('/api/wishlist', config);
        setWishlist(data);
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.message || 'Error fetching wishlist');
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [userInfo]);

  const removeFromWishlist = async (productId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.delete(`/api/wishlist/${productId}`, config);
      setWishlist(wishlist.filter((item) => item._id !== productId));
      toast.success('Product removed from wishlist');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error removing from wishlist');
    }
  };

  const moveToCart = async (product) => {
    try {
      await addToCart(product, 1);
      await removeFromWishlist(product._id);
      toast.success('Product moved to cart');
    } catch (error) {
      toast.error('Error moving product to cart');
    }
  };

  if (loading) return <Loader />;
  if (error) return <Message variant="error">{error}</Message>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">My Wishlist</h1>
      {wishlist.length === 0 ? (
        <Message>
          Your wishlist is empty. <Link to="/" className="text-blue-600 hover:underline">Go Shopping</Link>
        </Message>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((product) => (
            <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <Link
                  to={`/product/${product._id}`}
                  className="text-lg font-semibold text-gray-800 hover:text-blue-600"
                >
                  {product.name}
                </Link>
                <p className="text-gray-600 mt-2">${product.price}</p>
                <div className="mt-4 space-x-2">
                  <button
                    onClick={() => moveToCart(product)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Move to Cart
                  </button>
                  <button
                    onClick={() => removeFromWishlist(product._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage; 