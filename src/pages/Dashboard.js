"use client"

import { useState } from "react"
import OrderHistory from "./OrderHistory"
import Wishlist from "./Wishlist"
import ProfileForm from "./ProfileForm"
import "../pages/dashboard.css"

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("orders")

  const renderContent = () => {
    switch (activeTab) {
      case "orders":
        return (
          <div className="order-history-container">
            <div className="order-history-header">
              <h2 className="order-history-title">
                <span className="emoji">📦</span>
                Riwayat Pesanan
              </h2>
              <p className="order-history-subtitle">Kelola dan pantau semua pesanan Anda di sini</p>
            </div>
            <OrderHistory />
          </div>
        )
      case "profile":
        return (
          <div className="profile-form-container">
            <h2 className="profile-form-title">
              <span className="emoji">👤</span>
              Profil Saya
            </h2>
            <ProfileForm />
          </div>
        )
      case "wishlist":
        return (
          <div className="wishlist-container">
            <h2 className="wishlist-title">
              <span className="emoji">❤️</span>
              Wishlist
            </h2>
            <Wishlist />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        {/* Dashboard Header */}
        <div className="dashboard-header">
          <h1 className="dashboard-title">
            <span className="emoji">📊</span>
            Dashboard
          </h1>
        </div>

        {/* Tab Navigation */}
        <div className="dashboard-tabs">
          <button
            className={`tab-button ${activeTab === "orders" ? "active" : ""}`}
            onClick={() => setActiveTab("orders")}
          >
            <span className="emoji">📦</span>
            Riwayat
          </button>
          <button
            className={`tab-button ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            <span className="emoji">👤</span>
            Profil
          </button>
          <button
            className={`tab-button ${activeTab === "wishlist" ? "active" : ""}`}
            onClick={() => setActiveTab("wishlist")}
          >
            <span className="emoji">❤️</span>
            Wishlist
          </button>
        </div>

        {/* Tab Content */}
        <div className="dashboard-content-area">
          <div className="tab-content animate-fadeInUp">{renderContent()}</div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
