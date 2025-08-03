import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogle = async () => {
    setIsLoading(true);
    setError("");
    
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToLogin = () => {
    document.querySelector('.login-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="login-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome <span className="brand-name animate-fade-float">Rulif Tech Store</span>
          </h1>
          <p className="hero-description">
            Access your account to continue your tech journey
            <br />
            Secure login with advanced protection for your privacy.
          </p>
          
          <div className="cta-buttons">
            <button 
              className="primary-btn" 
              onClick={scrollToLogin}
            >
              Login Now
            </button>
            <button 
              className="secondary-btn" 
              onClick={() => navigate('/register')}
            >
              Create Account
            </button>
          </div>
        </div>
      </div>

      {/* Login Section */}
      <div className="login-section">
        <div className="section-header">
          <h2>🔐 Secure Login</h2>
          <p>Enter your credentials to access your account</p>
        </div>
        
        <div className="login-form-container">
          <div className="login-card">
            {error && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                {error}
              </div>
            )}
            
            <form onSubmit={handleLogin} className="login-form">
              <div className="input-group">
                <div className="input-icon">📧</div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="login-input"
                  disabled={isLoading}
                />
              </div>
              
              <div className="input-group">
                <div className="input-icon">🔒</div>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className="login-input"
                  disabled={isLoading}
                />
              </div>
              
              <button 
                type="submit" 
                className="login-btn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="loading-spinner">⏳</span>
                    Logging in...
                  </>
                ) : (
                  <>
                    <span className="btn-icon">🚀</span>
                    Login to Account
                  </>
                )}
              </button>
            </form>
            
            <div className="divider">
              <span>OR</span>
            </div>
            
            <button 
              onClick={handleGoogle}
              className="google-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading-spinner">⏳</span>
                  Connecting...
                </>
              ) : (
                <>
                  <span className="google-icon">🌐</span>
                  Continue with Google
                </>
              )}
            </button>
            
            <div className="login-footer">
              <p>Don't have an account? 
                <button 
                  className="link-btn"
                  onClick={() => navigate('/register')}
                >
                  Sign up here
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;