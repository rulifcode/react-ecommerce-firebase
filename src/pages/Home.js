import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import "./home.css";

const Home = () => {
  const { currentUser } = useAuth();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Load favorites from localStorage
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);

    // Listen to products collection (changed from "products" to "product" to match ProductList)
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

  const handleAddToCart = (product) => {
    if (!currentUser) {
      alert("Silakan login terlebih dahulu untuk menambahkan ke keranjang.");
      navigate("/login");
    } else {
      addToCart(product);
    }
  };

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

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to <span className="brand-name animate-fade-float">Rulif Tech Store</span>
          </h1>
          <p className="hero-description">
             Empowering individuals and businesses with premium technology solutions. From consumer electronics to enterprise-grade equipment, we deliver quality, reliability, and innovation you can trust.
          </p>
          
          <div className="cta-buttons">
            <button 
              className="primary-btn" 
              onClick={() => {
                document.querySelector('.products-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="products-section">
        <div className="section-header">
          <h2>🏍️ Featured Products</h2>
          <p>Discover our handpicked selection of premium tech products</p>
        </div>
        
        {loading ? (
          <div className="loading-state">
            <div className="loading-icon">⏳</div>
            <p>Loading produk...</p>
          </div>
        ) : (
          <div className="product-grid">
            {products.map((product) => (
              <div className="product-card" key={product.id}>
                {/* Favorite Button */}
                <button
                  className="favorite-btn"
                  onClick={() => toggleFavorite(product.id)}
                  style={{
                    color: favorites.includes(product.id) ? "red" : "#ccc",
                  }}
                >
                  ♥
                </button>

                <div className="product-image-container">
                  <img
                    src={product.imageUrl || "https://via.placeholder.com/250x180?text=No+Image"}
                    alt={product.name}
                    className="product-img"
                  />
                  <div className="product-overlay">
                    <button 
                      className="quick-view-btn"
                      onClick={() => handleAddToCart(product)}
                    >
                      Quick Add
                    </button>
                  </div>
                </div>
                
                <div className="product-info">
                  <h4 className="product-name">{product.name}</h4>
                  <p className="product-category">Kategori: {product.category}</p>
                  <p className="product-description">{product.description}</p>
                  <div className="product-price">
                    <span className="currency">Rp</span>
                    <span className="amount">{product.price?.toLocaleString()}</span>
                  </div>
                  <p className="product-stock">Stok: {product.stok}</p>
                  <button 
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stok === 0}
                  >
                    <span className="btn-icon"></span>
                    {product.stok === 0 ? 'Stok Habis' : 'Tambah ke Keranjang'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {!loading && products.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon"></div>
            <h3>No Products Available</h3>
            <p>Check back later for amazing tech products!</p>
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="features-section">
        <div className="section-header">
          <h2>Why Choose Rulif Tech Store?</h2>
          <p>Experience the best in technology shopping</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon"></div>
            <h3>Fast Delivery</h3>
            <p>Get your products delivered within 24 hours in major cities</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"></div>
            <h3>Secure Payment</h3>
            <p>Your payment information is protected with bank-level security</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"></div>
            <h3>Quality Guarantee</h3>
            <p>All products come with warranty and quality assurance</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"></div>
            <h3>24/7 Support</h3>
            <p>Our AI-powered support team is always ready to help you</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;