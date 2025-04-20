"use client"

import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import { CartContext } from "../../context/CartContext"
import { FaShoppingCart, FaUser, FaSearch, FaBars } from "react-icons/fa"

const Header = () => {
  const { userInfo, logout } = useContext(AuthContext)
  const { cartItems } = useContext(CartContext)
  const [keyword, setKeyword] = useState("")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      navigate(`/search/${keyword}`)
    } else {
      navigate("/")
    }
  }

  const logoutHandler = () => {
    logout()
    navigate("/login")
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary">
            Myntra Clone
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-secondary-dark hover:text-primary">
              Home
            </Link>
            <Link to="/recommend" className="text-secondary-dark hover:text-primary">
              Recommendations
            </Link>
            <Link to="/wishlist" className="text-secondary-dark hover:text-primary">
              Wishlist
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:block w-1/3">
            <form onSubmit={submitHandler} className="flex">
              <input
                type="text"
                name="q"
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search for products, brands and more"
                className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button type="submit" className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-primary-dark">
                <FaSearch />
              </button>
            </form>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="text-secondary-dark hover:text-primary relative">
              <FaShoppingCart className="text-xl" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </Link>

            {userInfo ? (
              <div className="relative group">
                <button className="flex items-center text-secondary-dark hover:text-primary">
                  <FaUser className="text-xl mr-1" />
                  <span className="hidden md:inline">{userInfo.name.split(" ")[0]}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-secondary-dark hover:bg-gray-100">
                    Profile
                  </Link>
                  {userInfo.role === "admin" && (
                    <>
                      <Link
                        to="/admin/productlist"
                        className="block px-4 py-2 text-sm text-secondary-dark hover:bg-gray-100"
                      >
                        Products
                      </Link>
                      <Link
                        to="/admin/orderlist"
                        className="block px-4 py-2 text-sm text-secondary-dark hover:bg-gray-100"
                      >
                        Orders
                      </Link>
                      <Link
                        to="/admin/userlist"
                        className="block px-4 py-2 text-sm text-secondary-dark hover:bg-gray-100"
                      >
                        Users
                      </Link>
                    </>
                  )}
                  <button
                    onClick={logoutHandler}
                    className="block w-full text-left px-4 py-2 text-sm text-secondary-dark hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="text-secondary-dark hover:text-primary flex items-center">
                <FaUser className="text-xl mr-1" />
                <span className="hidden md:inline">Login</span>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-secondary-dark hover:text-primary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <FaBars className="text-xl" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4">
            <form onSubmit={submitHandler} className="flex mb-4">
              <input
                type="text"
                name="q"
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search"
                className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button type="submit" className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-primary-dark">
                <FaSearch />
              </button>
            </form>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-secondary-dark hover:text-primary py-2" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link
                to="/recommend"
                className="text-secondary-dark hover:text-primary py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Recommendations
              </Link>
              <Link
                to="/wishlist"
                className="text-secondary-dark hover:text-primary py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Wishlist
              </Link>
              {userInfo && userInfo.role === "admin" && (
                <>
                  <Link
                    to="/admin/productlist"
                    className="text-secondary-dark hover:text-primary py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Products
                  </Link>
                  <Link
                    to="/admin/orderlist"
                    className="text-secondary-dark hover:text-primary py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Orders
                  </Link>
                  <Link
                    to="/admin/userlist"
                    className="text-secondary-dark hover:text-primary py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Users
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
