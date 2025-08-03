import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import "./Navbar.css";

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      alert("Gagal logout. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  if (!currentUser) return null;

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const isActiveLink = (path) => {
    return location.pathname === path ? 'nav-link active' : 'nav-link';
  };

  const navbarClass = `navbar ${isScrolled ? 'scrolled' : ''} ${isLoading ? 'loading' : ''}`;

  return (
    <>
      <nav className={navbarClass}>
        {/* Brand/Logo Section */}
        <div className="navbar-brand">
          <Link to="/" className="brand-link" onClick={closeMobileMenu}>
            <span className="brand-icon">⚡</span>
            <span className="brand-text">Rulif Tech</span>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation Links */}
        <div className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <Link 
            to="/" 
            className={isActiveLink('/')}
            onClick={closeMobileMenu}
          >
            <span className="nav-text">Home</span>
          </Link>
          
          <Link 
            to="/products" 
            className={isActiveLink('/products')}
            onClick={closeMobileMenu}
          >
            <span className="nav-text">Produk</span>
          </Link>
          
          <Link 
            to="/cart" 
            className={`${isActiveLink('/cart')} cart-link`}
            onClick={closeMobileMenu}
          >
            <span className="nav-text">Cart</span>
            {cartItemCount > 0 && (
              <span className="cart-badge" title={`${cartItemCount} items in cart`}>
                {cartItemCount > 99 ? '99+' : cartItemCount}
              </span>
            )}
          </Link>
          
          <Link 
            to="/orders" 
            className={isActiveLink('/orders')}
            onClick={closeMobileMenu}
          >
            <span className="nav-text">Pesanan</span>
          </Link>
          
          <Link 
            to="/dashboard" 
            className={isActiveLink('/dashboard')}
            onClick={closeMobileMenu}
          >
            <span className="nav-text">Dashboard</span>
          </Link>
        </div>
        
        {/* User Info Section */}
        <div className={`user-info ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <div className="user-email" title={currentUser.email}>
            <span className="user-text">
              {currentUser.displayName || currentUser.email?.split('@')[0] || 'User'}
            </span>
          </div>
          
          <button 
            onClick={handleLogout} 
            className="logout-btn"
            disabled={isLoading}
            title="Logout from account"
          >
            <span className="logout-text">
              {isLoading ? 'Logging out...' : 'Logout'}
            </span>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="mobile-overlay" 
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
        )}
      </nav>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="navbar-spacer" />
    </>
  );
};

export default Navbar;