import React, { useState, useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { saveOrder } from "../firebase/OrderService";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [profile, setProfile] = useState({ address: "", phone: "" });

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  useEffect(() => {
    const fetchProfile = async () => {
      if (!currentUser) return;
      const docRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProfile(docSnap.data());
      }
    };
    fetchProfile();
  }, [currentUser]);

  const handleCheckout = async () => {
    if (!currentUser || cartItems.length === 0) return;

    if (!profile.address || !profile.phone) {
      alert("❗ Mohon lengkapi alamat dan nomor HP di profil terlebih dahulu.");
      return;
    }

    try {
      await saveOrder(currentUser.uid, cartItems, totalPrice, {
        address: profile.address,
        phone: profile.phone,
        email: currentUser.email,
        paymentMethod,
      });

      alert("✅ Pesanan berhasil dibuat!");
      clearCart();
      navigate("/orders");
    } catch (error) {
      alert("❌ Gagal membuat pesanan: " + error.message);
      console.error("Gagal membuat pesanan:", error);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h2>🛒 Checkout</h2>

      {cartItems.length === 0 ? (
        <p>Keranjang kosong.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item, i) => (
              <li key={i} style={{ marginBottom: "1rem" }}>
                <strong>{item.name}</strong> x {item.quantity} — Rp
                {(item.price * item.quantity).toLocaleString()} <br />
                <small>Stok tersedia: {item.stok}</small>
              </li>
            ))}
          </ul>

          <p>
            <strong>Total:</strong> Rp{totalPrice.toLocaleString()}
          </p>

          {/* Metode Pembayaran */}
          <div style={{ marginBottom: "1rem" }}>
            <label><strong>Metode Pembayaran:</strong></label><br />
            <label>
              <input
                type="radio"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />{" "}
              🏠 Bayar di Tempat (COD)
            </label><br />
            <label>
              <input
                type="radio"
                value="debit"
                checked={paymentMethod === "debit"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />{" "}
              💳 Kartu Debit / Transfer
            </label>
          </div>

          {/* Alamat dan HP */}
          <div style={{ marginBottom: "1rem" }}>
            <p><strong>Alamat Pengiriman:</strong> {profile.address || "(belum diisi)"}</p>
            <p><strong>No HP:</strong> {profile.phone || "(belum diisi)"}</p>
            <p><strong>Email:</strong> {currentUser.email}</p>
          </div>

          <button
            onClick={handleCheckout}
            style={{
              backgroundColor: "#28a745",
              color: "#fff",
              padding: "0.6rem 1.5rem",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Buat Pesanan
          </button>
        </>
      )}
    </div>
  );
};

export default Checkout;
