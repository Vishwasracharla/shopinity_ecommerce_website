import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

// Layouts
import Header from "./components/layout/Header"
import Footer from "./components/layout/Footer"

// Pages
import HomePage from "./pages/HomePage"
import ProductPage from "./pages/ProductPage"
import CartPage from "./pages/CartPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import ProfilePage from "./pages/ProfilePage"
import ShippingPage from "./pages/ShippingPage"
import PaymentPage from "./pages/PaymentPage"
import PlaceOrderPage from "./pages/PlaceOrderPage"
import OrderPage from "./pages/OrderPage"
import RecommendPage from "./pages/RecommendPage"
import WishlistPage from "./pages/WishlistPage"

// Admin Pages
import ProductListPage from "./pages/admin/ProductListPage"
import ProductEditPage from "./pages/admin/ProductEditPage"
import OrderListPage from "./pages/admin/OrderListPage"
import UserListPage from "./pages/admin/UserListPage"

// Context Providers
import { AuthProvider } from "./context/AuthContext"
import { CartProvider } from "./context/CartContext"

// Route Protection
import PrivateRoute from "./components/routes/PrivateRoute"
import AdminRoute from "./components/routes/AdminRoute"

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Header />
          <main className="min-h-screen py-3">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search/:keyword" element={<HomePage />} />
              <Route path="/page/:pageNumber" element={<HomePage />} />
              <Route path="/search/:keyword/page/:pageNumber" element={<HomePage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <ProfilePage />
                  </PrivateRoute>
                }
              />

              <Route
                path="/shipping"
                element={
                  <PrivateRoute>
                    <ShippingPage />
                  </PrivateRoute>
                }
              />

              <Route
                path="/payment"
                element={
                  <PrivateRoute>
                    <PaymentPage />
                  </PrivateRoute>
                }
              />

              <Route
                path="/placeorder"
                element={
                  <PrivateRoute>
                    <PlaceOrderPage />
                  </PrivateRoute>
                }
              />

              <Route
                path="/order/:id"
                element={
                  <PrivateRoute>
                    <OrderPage />
                  </PrivateRoute>
                }
              />

              <Route
                path="/recommend"
                element={
                  <PrivateRoute>
                    <RecommendPage />
                  </PrivateRoute>
                }
              />

              <Route
                path="/wishlist"
                element={
                  <PrivateRoute>
                    <WishlistPage />
                  </PrivateRoute>
                }
              />

              <Route
                path="/admin/productlist"
                element={
                  <AdminRoute>
                    <ProductListPage />
                  </AdminRoute>
                }
              />

              <Route
                path="/admin/product/:id/edit"
                element={
                  <AdminRoute>
                    <ProductEditPage />
                  </AdminRoute>
                }
              />

              <Route
                path="/admin/orderlist"
                element={
                  <AdminRoute>
                    <OrderListPage />
                  </AdminRoute>
                }
              />

              <Route
                path="/admin/userlist"
                element={
                  <AdminRoute>
                    <UserListPage />
                  </AdminRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
          <ToastContainer position="top-right" autoClose={3000} />
        </CartProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
