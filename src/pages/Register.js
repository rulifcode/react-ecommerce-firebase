// src/pages/Register.js
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import "./register.css";

const Register = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      // Create user account
      const userCredential = await signup(email, password);
      const user = userCredential.user;
      
      // Save additional user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: email,
        fullName: fullName,
        phone: phone,
        address: address,
        createdAt: new Date().toISOString(),
        uid: user.uid
      });
      
      navigate("/"); // redirect ke halaman utama
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToRegister = () => {
    document.querySelector('.register-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="register-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Join <span className="brand-name animate-fade-float">Rulif Tech Store</span>
          </h1>
          <p className="hero-description">
            Create your account and start your tech journey today
            <br />
            Get access to exclusive deals and personalized recommendations.
          </p>
          
          <div className="cta-buttons">
            <button 
              className="primary-btn" 
              onClick={scrollToRegister}
            >
              Create Account
            </button>
            <button 
              className="secondary-btn" 
              onClick={() => navigate('/login')}
            >
              Already Member?
            </button>
          </div>
        </div>
      </div>

      {/* Register Section */}
      <div className="register-section">
        <div className="section-header">
          <h2>✨ Create Your Account</h2>
          <p>Join our community and unlock exclusive tech deals</p>
        </div>
        
        <div className="register-form-container">
          <div className="register-card">
            {error && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                {error}
              </div>
            )}
            
            <form onSubmit={handleRegister} className="register-form">
              <div className="input-group">
                <div className="input-icon">👤</div>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  required
                  onChange={(e) => setFullName(e.target.value)}
                  className="register-input"
                  disabled={isLoading}
                />
              </div>

              <div className="input-group">
                <div className="input-icon">📧</div>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="register-input"
                  disabled={isLoading}
                />
              </div>
              
              <div className="input-group">
                <div className="input-icon">🔒</div>
                <input
                  type="password"
                  placeholder="Password (min 6 characters)"
                  value={password}
                  required
                  minLength="6"
                  onChange={(e) => setPassword(e.target.value)}
                  className="register-input"
                  disabled={isLoading}
                />
              </div>

              <div className="input-group">
                <div className="input-icon">📱</div>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  required
                  onChange={(e) => setPhone(e.target.value)}
                  className="register-input"
                  disabled={isLoading}
                />
              </div>

              <div className="input-group">
                <div className="input-icon">📍</div>
                <textarea
                  placeholder="Your Address"
                  value={address}
                  required
                  onChange={(e) => setAddress(e.target.value)}
                  className="register-textarea"
                  disabled={isLoading}
                  rows="3"
                />
              </div>
              
              <button 
                type="submit" 
                className="register-btn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="loading-spinner">⏳</span>
                    Creating Account...
                  </>
                ) : (
                  <>
                    <span className="btn-icon">🚀</span>
                    Create My Account
                  </>
                )}
              </button>
            </form>
            
            <div className="register-footer">
              <p>Already have an account? 
                <button 
                  className="link-btn"
                  onClick={() => navigate('/login')}
                >
                  Sign in here
                </button>
              </p>
              <p className="terms-text">
                By creating an account, you agree to our 
                <span className="terms-link"> Terms of Service</span> and 
                <span className="terms-link"> Privacy Policy</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;