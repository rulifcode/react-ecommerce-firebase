import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "./order.css";

const OrderHistory = () => {
  const { currentUser, loading } = useAuth();
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    if (!currentUser) return;
    try {
      const q = query(collection(db, "orders"), where("userId", "==", currentUser.uid));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      // Sort by date (newest first)
      data.sort((a, b) => (b.createdAt?.toDate() || new Date()) - (a.createdAt?.toDate() || new Date()));
      setOrders(data);
    } catch (error) {
      console.error("❌ Gagal fetch orders:", error);
    } finally {
      setOrdersLoading(false);
    }
  };

  useEffect(() => {
    if (!loading) fetchOrders();
  }, [currentUser, loading]);

  const handleCancel = async (orderId) => {
    const confirm = window.confirm("Yakin ingin membatalkan pesanan ini?");
    if (!confirm) return;
    try {
      await updateDoc(doc(db, "orders", orderId), {
        status: "dibatalkan"
      });
      alert("✅ Pesanan dibatalkan.");
      fetchOrders();
    } catch (error) {
      alert("❌ Gagal membatalkan pesanan.");
      console.error(error);
    }
  };

  const handleDelete = async (orderId) => {
    const confirm = window.confirm("⚠️ Ini hanya untuk percobaan. Yakin ingin MENGHAPUS pesanan?");
    if (!confirm) return;
    try {
      await deleteDoc(doc(db, "orders", orderId));
      alert("🗑 Pesanan berhasil dihapus.");
      fetchOrders();
    } catch (error) {
      console.error("❌ Gagal hapus pesanan:", error);
      alert("❌ Gagal menghapus pesanan.");
    }
  };

  if (loading || ordersLoading) {
    return (
      <div className="order-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Memuat pesanan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="order-container">
      <div className="order-content">
        {/* Page Header */}
        <div className="order-header">
          <h1 className="order-title">Riwayat Pesanan</h1>
          <p className="order-subtitle">
            Kelola dan pantau semua pesanan Anda di sini
          </p>
        </div>

        {orders.length === 0 ? (
          /* Empty Orders State */
          <div className="empty-orders">
            <div className="empty-orders-icon"></div>
            <h2 className="empty-orders-title">Belum Ada Pesanan</h2>
            <p className="empty-orders-description">
              Anda belum memiliki riwayat pesanan. Mulai berbelanja sekarang dan temukan produk teknologi terbaik!
            </p>
            <button 
              className="shop-now-btn"
              onClick={() => navigate('/products')}
            >
              Mulai Belanja
            </button>
          </div>
        ) : (
          /* Orders List */
          <div className="orders-list">
            {orders.map(order => (
              <div key={order.id} className="order-card">
                {/* Order Header Info */}
                <div className="order-header-info">
                  <div className="order-info-item">
                    <span className="order-info-label">Order ID</span>
                    <span className="order-info-value order-id">{order.id}</span>
                  </div>
                  
                  <div className="order-info-item">
                    <span className="order-info-label">Email</span>
                    <span className="order-info-value">{currentUser.email}</span>
                  </div>
                  
                  <div className="order-info-item">
                    <span className="order-info-label">Tanggal</span>
                    <span className="order-info-value order-date">
                      {order.createdAt?.toDate().toLocaleString("id-ID") || "Tidak diketahui"}
                    </span>
                  </div>
                  
                  <div className="order-info-item">
                    <span className="order-info-label">Total</span>
                    <span className="order-info-value order-total">
                      Rp {order.total.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="order-info-item">
                    <span className="order-info-label">Pembayaran</span>
                    <span className={`payment-method ${order.paymentMethod === "cod" ? "payment-cod" : "payment-transfer"}`}>
                      {order.paymentMethod === "cod" ? "Bayar di Tempat" : "Transfer Bank"}
                    </span>
                  </div>
                  
                  <div className="order-info-item">
                    <span className="order-info-label">Status</span>
                    <span className={`order-status ${order.status === "dibatalkan" ? "status-cancelled" : "status-active"}`}>
                      {order.status || "aktif"}
                    </span>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="contact-info">
                  <div className="contact-item">
                    <span className="contact-label">Alamat Pengiriman</span>
                    <span className={`contact-value ${!order.address ? "contact-missing" : ""}`}>
                      {order.address || "Tidak ada alamat"}
                    </span>
                  </div>
                  
                  <div className="contact-item">
                    <span className="contact-label">Nomor HP</span>
                    <span className={`contact-value ${!order.phone ? "contact-missing" : ""}`}>
                      {order.phone || "Tidak ada nomor HP"}
                    </span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="order-items">
                  <h3 className="order-items-title">Item Pesanan</h3>
                  <ul className="order-items-list">
                    {order.items.map((item, i) => (
                      <li key={i} className="order-item">
                        <div className="order-item-info">
                          <div className="order-item-name">{item.name}</div>
                          <div className="order-item-quantity">{item.quantity}</div>
                        </div>
                        <div className="order-item-price">
                          Rp {(item.price * item.quantity).toLocaleString()}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Order Actions */}
                <div className="order-actions">
                  {order.status !== "dibatalkan" && (
                    <button
                      className="cancel-btn"
                      onClick={() => handleCancel(order.id)}
                      title="Batalkan pesanan"
                    >
                      Batalkan
                    </button>
                  )}
                  
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(order.id)}
                    title="Hapus pesanan (hanya untuk percobaan)"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;