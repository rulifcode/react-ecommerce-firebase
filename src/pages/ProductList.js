import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";
import { useCart } from "../contexts/CartContext";
import "./product.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);

    const unsubscribe = onSnapshot(collection(db, "product"), (snapshot) => {
      const productList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const toggleFavorite = (productId) => {
    setFavorites((prev) => {
      let updated;
      if (prev.includes(productId)) {
        updated = prev.filter((id) => id !== productId);
      } else {
        updated = [...prev, productId];
      }
      localStorage.setItem("favorites", JSON.stringify(updated));
      return updated;
    });
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return 'stock-out';
    if (stock <= 5) return 'stock-low';
    return 'stock-available';
  };

  const getStockText = (stock) => {
    if (stock === 0) return 'Stok Habis';
    if (stock <= 5) return `Stok Menipis (${stock})`;
    return `Stok: ${stock}`;
  };

  return (
    <div className="product-container">
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">Daftar Produk</h1>
        <p className="page-subtitle">
          Temukan produk teknologi terbaik dengan kualitas premium
        </p>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Memuat produk...</p>
        </div>
      ) : products.length === 0 ? (
        /* Empty State */
        <div className="empty-state">
          <div className="empty-icon"></div>
          <h2 className="empty-title">Belum Ada Produk</h2>
          <p className="empty-description">
            Produk sedang dalam proses penambahan. Silakan kembali lagi nanti untuk melihat koleksi produk terbaru kami.
          </p>
        </div>
      ) : (
        /* Product Grid */
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              {/* Favorite Button */}
              <button
                className={`favorite-btn ${favorites.includes(product.id) ? 'active' : ''}`}
                onClick={() => toggleFavorite(product.id)}
                title={favorites.includes(product.id) ? 'Hapus dari favorit' : 'Tambah ke favorit'}
                aria-label={favorites.includes(product.id) ? 'Hapus dari favorit' : 'Tambah ke favorit'}
              >
                ♥
              </button>

              {/* Product Image */}
              <div className="product-image-container">
                <img
                  src={product.imageUrl || "https://via.placeholder.com/300x220?text=No+Image"}
                  alt={product.name}
                  className="product-image"
                  loading="lazy"
                />
              </div>

              {/* Product Info */}
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                
                <p className="product-category">
                  {product.category}
                </p>
                
                <p className="product-description">
                  {product.description}
                </p>
                
                <div className="product-price">
                  <span className="price-label">Harga:</span>
                  <span className="price-amount">
                    Rp {product.price?.toLocaleString()}
                  </span>
                </div>
                
                <p className={`product-stock ${getStockStatus(product.stok)}`}>
                  {getStockText(product.stok)}
                </p>
                
                <button
                  className="add-to-cart-btn"
                  onClick={() => addToCart(product)}
                  disabled={product.stok === 0}
                  title={product.stok === 0 ? 'Produk habis' : 'Tambah ke keranjang'}
                >
                  {product.stok === 0 ? 'Stok Habis' : 'Tambah ke Keranjang'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;