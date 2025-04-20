"use client"

import React, { createContext, useState, useEffect } from 'react';
import axios from "axios"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(() => {
    const savedUser = localStorage.getItem('userInfo');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Update localStorage when userInfo changes
  useEffect(() => {
    if (userInfo) {
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    } else {
      localStorage.removeItem('userInfo');
    }
  }, [userInfo])

  // Login user
  const login = async (email, password) => {
    try {
      setLoading(true)
      setError(null)

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      }

      const { data } = await axios.post("/api/auth/signin", { email, password }, config)

      setUserInfo(data)
      setLoading(false)
    } catch (error) {
      setError(error.response && error.response.data.message ? error.response.data.message : error.message)
      setLoading(false)
    }
  }

  // Register user
  const register = async (name, email, password) => {
    try {
      setLoading(true)
      setError(null)

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      }

      const { data } = await axios.post("/api/auth/signup", { name, email, password }, config)

      setUserInfo(data)
      setLoading(false)
    } catch (error) {
      setError(error.response && error.response.data.message ? error.response.data.message : error.message)
      setLoading(false)
    }
  }

  // Logout user
  const logout = () => {
    setUserInfo(null)
  }

  // Update user profile
  const updateProfile = async (user) => {
    try {
      setLoading(true)
      setError(null)

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.put("/api/auth/profile", user, config)

      setUserInfo({ ...data })
      setLoading(false)
    } catch (error) {
      setError(error.response && error.response.data.message ? error.response.data.message : error.message)
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        loading,
        error,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
