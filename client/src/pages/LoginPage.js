"use client"

import { useState, useEffect, useContext } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import FormContainer from "../components/ui/FormContainer"
import Loader from "../components/ui/Loader"
import Message from "../components/ui/Message"

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()
  const location = useLocation()
  const { userInfo, loading, error, login } = useContext(AuthContext)

  const redirect = location.search ? location.search.split("=")[1] : "/"

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    login(email, password)
  }

  return (
    <FormContainer>
      <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>
      {error && <Message variant="error">{error}</Message>}
      {loading && <Loader />}
      <form onSubmit={submitHandler}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-secondary-dark mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-secondary-dark mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors"
          disabled={loading}
        >
          Sign In
        </button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-secondary">
          New Customer?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"} className="text-primary hover:underline">
            Register
          </Link>
        </p>
      </div>
    </FormContainer>
  )
}

export default LoginPage
