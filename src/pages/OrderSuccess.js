import React, { useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderId = location.state?.orderId;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/order-history");
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h2>✅ Pesanan Anda Berhasil!</h2>
      {orderId && <p>ID Pesanan: <strong>{orderId}</strong></p>}
      <p>Terima kasih telah berbelanja dengan kami.</p>
      <p>Anda akan diarahkan ke halaman Riwayat Pesanan dalam 5 detik...</p>
      <p>
        <Link to="/order-history" style={{ color: "#007bff", textDecoration: "underline" }}>
          Klik di sini jika tidak otomatis
        </Link>
      </p>
      <div style={{ marginTop: "2rem" }}>
        <button onClick={() => navigate("/products")} style={{ marginRight: "1rem" }}>
          Lanjut Belanja
        </button>
        <button onClick={() => navigate("/order-history")}>
          Lihat Riwayat Pesanan
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;