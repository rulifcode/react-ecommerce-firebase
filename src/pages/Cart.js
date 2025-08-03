import React, { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import "./cart.css";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, updateQuantity } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [syncedCart, setSyncedCart] = useState([]);
  const [profile, setProfile] = useState({ address: "", phone: "" });
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [selectedBank, setSelectedBank] = useState("bca");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const syncCartData = async () => {
      const updated = [];
      for (const item of cartItems) {
        try {
          const productRef = doc(db, "product", item.id);
          const productSnap = await getDoc(productRef);
          if (productSnap.exists()) {
            const data = productSnap.data();
            updated.push({
              ...item,
              name: data.name,
              price: data.price,
              stok: data.stok,
              imageUrl: data.imageUrl || "",
            });
          }
        } catch (error) {
          console.error("Gagal ambil produk:", error);
        }
      }
      setSyncedCart(updated);
    };

    const fetchUserProfile = async () => {
      try {
        if (!currentUser) return;
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setProfile(userSnap.data());
        }
      } catch (err) {
        console.error("Gagal ambil profil:", err);
      } finally {
        setLoading(false);
      }
    };

    syncCartData();
    fetchUserProfile();
  }, [cartItems, currentUser]);

  const total = syncedCart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const increaseQty = (item) => {
    if (item.quantity < item.stok) {
      updateQuantity(item.id, item.quantity + 1);
    } else {
      alert("Stok tidak cukup!");
    }
  };

  const decreaseQty = (item) => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  if (loading) {
    return (
      <div className="cart-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Memuat keranjang...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-content">
        {/* Page Header */}
        <div className="cart-header">
          <h1 className="cart-title">Keranjang Belanja</h1>
        </div>

        {syncedCart.length === 0 ? (
          /* Empty Cart State */
          <div className="empty-cart">
            <div className="empty-cart-icon"></div>
            <h2 className="empty-cart-title">Keranjang Kamu Kosong</h2>
            <p className="empty-cart-description">
              Belum ada produk di keranjang. Yuk mulai belanja dan temukan produk teknologi terbaik!
            </p>
            <button 
              className="shop-now-btn"
              onClick={() => navigate('/products')}
            >
              Mulai Belanja
            </button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <ul className="cart-items">
              {syncedCart.map((item) => (
                <li key={item.id} className="cart-item">
                  <div className="cart-item-content">
                    <img
                      src={item.imageUrl || "https://via.placeholder.com/120x100?text=No+Image"}
                      alt={item.name}
                      className="cart-item-image"
                      loading="lazy"
                    />
                    
                    <div className="cart-item-info">
                      <h3 className="cart-item-name">{item.name}</h3>
                      <p className="cart-item-price">
                        Rp {item.price.toLocaleString()}
                      </p>
                      <p className="cart-item-stock">
                        Stok: {item.stok}
                      </p>
                      
                      <div className="quantity-controls">
                        <button 
                          className="quantity-btn"
                          onClick={() => decreaseQty(item)}
                          disabled={item.quantity <= 1}
                          title="Kurangi jumlah"
                        >
                          -
                        </button>
                        <span className="quantity-display">{item.quantity}</span>
                        <button 
                          className="quantity-btn"
                          onClick={() => increaseQty(item)}
                          disabled={item.quantity >= item.stok}
                          title="Tambah jumlah"
                        >
                          +
                        </button>
                      </div>
                      
                      <p className="cart-item-subtotal">
                        Subtotal: Rp {(item.quantity * item.price).toLocaleString()}
                      </p>
                    </div>

                    <button 
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                      title="Hapus dari keranjang"
                    >
                      Hapus
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {/* Cart Total */}
            <div className="cart-total">
              <div className="total-amount">
                Total: Rp {total.toLocaleString()}
              </div>
            </div>

            {/* User Info Section */}
            <div className="user-info-section">
              <h3 className="section-title shipping-info">Info Pengiriman</h3>
              <div className="info-item">
                <span className="info-label">Alamat:</span>
                <span className={profile.address ? "" : "info-missing"}>
                  {profile.address || "(Belum diisi)"}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">No HP:</span>
                <span className={profile.phone ? "" : "info-missing"}>
                  {profile.phone || "(Belum diisi)"}
                </span>
              </div>
            </div>

            {/* Payment Method Section */}
            <div className="user-info-section">
              <h3 className="section-title payment-info">Pilih Metode Pembayaran</h3>
              
              <div className="payment-methods">
                <label className={`payment-option ${paymentMethod === 'cod' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    className="payment-radio"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                  />
                  <span className="payment-label">🏠 Bayar di Tempat (COD)</span>
                </label>

                <label className={`payment-option ${paymentMethod === 'debit' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    className="payment-radio"
                    value="debit"
                    checked={paymentMethod === "debit"}
                    onChange={() => setPaymentMethod("debit")}
                  />
                  <span className="payment-label">💳 Transfer Bank</span>
                </label>

                {/* Bank Options */}
                {paymentMethod === "debit" && (
                  <div className="bank-options">
                    <label className={`bank-option ${selectedBank === 'bca' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        className="payment-radio"
                        value="bca"
                        checked={selectedBank === "bca"}
                        onChange={() => setSelectedBank("bca")}
                      />
                      <span className="payment-label">BCA (123*******)</span>
                    </label>
                    
                    <label className={`bank-option ${selectedBank === 'bri' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        className="payment-radio"
                        value="bri"
                        checked={selectedBank === "bri"}
                        onChange={() => setSelectedBank("bri")}
                      />
                      <span className="payment-label">BRI (09876******)</span>
                    </label>
                  </div>
                )}
              </div>

              {/* Selected Method Display */}
              <div className="selected-method">
                Metode Terpilih: {paymentMethod === "cod" ? "Bayar di Tempat (COD)" : `Transfer ke ${selectedBank.toUpperCase()}`}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <button
                className="clear-btn"
                onClick={clearCart}
                title="Kosongkan keranjang"
              >
                Kosongkan
              </button>
              
              <button
                className="checkout-btn"
                onClick={() => navigate("/checkout")}
                title="Lanjut ke checkout"
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;