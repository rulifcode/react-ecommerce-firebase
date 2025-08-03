"use client"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ProductList from "./pages/ProductList"
import Cart from "./pages/Cart"
import Home from "./pages/Home"
import OrderSuccess from "./pages/OrderSuccess"
import OrderHistory from "./pages/OrderHistory"
import Checkout from "./pages/Checkout"
import Dashboard from "./pages/Dashboard"
import { useAuth } from "./contexts/AuthContext"
import Navbar from "./components/Navbar"
import Footer from "./components/footer"

// Komponen proteksi route
const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth()
  return currentUser ? children : <Navigate to="/login" />
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/products"
              element={
                <PrivateRoute>
                  <ProductList />
                </PrivateRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <PrivateRoute>
                  <Cart />
                </PrivateRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <PrivateRoute>
                  <Checkout />
                </PrivateRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <PrivateRoute>
                  <OrderHistory />
                </PrivateRoute>
              }
            />
            <Route
              path="/order-success"
              element={
                <PrivateRoute>
                  <OrderSuccess />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
