"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "../firebase/config"
import "./profil.css" // Fixed import path - same directory

const ProfileForm = () => {
  const { currentUser } = useAuth()
  const [profile, setProfile] = useState({
    fullName: "",
    address: "",
    phone: "",
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: "", text: "" })

  useEffect(() => {
    const fetchProfile = async () => {
      if (!currentUser) return

      try {
        const docRef = doc(db, "users", currentUser.uid)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setProfile(docSnap.data())
        }
      } catch (error) {
        console.error("Error fetching profile:", error)
        setMessage({ type: "error", text: "Gagal memuat profil" })
      }
    }

    fetchProfile()
  }, [currentUser])

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value })
    // Clear message when user starts typing
    if (message.text) {
      setMessage({ type: "", text: "" })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await setDoc(doc(db, "users", currentUser.uid), profile)
      setMessage({ type: "success", text: "Profil berhasil diperbarui!" })
    } catch (err) {
      console.error("❌ Gagal update profil:", err)
      setMessage({ type: "error", text: "Terjadi kesalahan saat menyimpan." })
    } finally {
      setLoading(false)
    }
  }

  const getInitials = (name) => {
    return (
      name
        .split(" ")
        .map((word) => word.charAt(0))
        .join("")
        .toUpperCase()
        .slice(0, 2) || "👤"
    )
  }

  return (
    <div className="profile-container">
      <div className="profile-content">
        <div className="profile-form-card">
          {/* Profile Header */}
          <div className="profile-header">
            <h2 className="profile-title">
              <span className="emoji">👤</span>
              Edit Profil
            </h2>
            <p className="profile-subtitle">Kelola informasi pribadi Anda</p>
          </div>

          {/* Profile Avatar */}
          <div className="profile-avatar">
            <div className="avatar-circle">{profile.fullName ? getInitials(profile.fullName) : "👤"}</div>
            <div className="avatar-name">{currentUser?.email}</div>
          </div>

          {/* Success/Error Messages */}
          {message.text && (
            <div className={message.type === "success" ? "success-message" : "error-message"}>{message.text}</div>
          )}

          {/* Profile Form */}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Nama Lengkap</label>
              <input
                type="text"
                name="fullName"
                value={profile.fullName}
                onChange={handleChange}
                placeholder="Masukkan nama lengkap"
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Alamat</label>
              <input
                type="text"
                name="address"
                value={profile.address}
                onChange={handleChange}
                placeholder="Masukkan alamat lengkap"
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Nomor HP</label>
              <input
                type="tel"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                placeholder="Masukkan nomor handphone"
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <div className="email-field">
                <input
                  type="email"
                  value={currentUser?.email || ""}
                  readOnly
                  className="form-input"
                  title="Email tidak dapat diubah"
                />
              </div>
            </div>

            <button type="submit" className="save-button" disabled={loading}>
              <span className="emoji">💾</span>
              {loading ? "Menyimpan..." : "Simpan Profil"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProfileForm
