"use client"
import { Link } from "react-router-dom"
import { FaGithub, FaInstagram, FaLinkedin, FaEnvelope, FaHeart, FaCode, FaStar } from "react-icons/fa"
import "./footer.css"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer-container">
      {/* Background pattern */}
      <div className="footer-background" />

      <div className="footer-content">
        <div className="footer-grid">
          {/* Developer Section - Now the main focus */}
          <div className="footer-brand">
            {/* Developer Section */}
            <div className="developer-card">
              <div className="developer-info">
                <div className="developer-avatar">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/photoprofil.jpeg`}
                    alt="Rulif Fadria Nirwansyah"
                    width="60"
                    height="60"
                    className="avatar-image"
                    onError={(e) => {
                      // Fallback if image doesn't load
                      e.target.style.display = "none"
                      e.target.nextSibling.style.display = "flex"
                    }}
                  />
                  {/* Fallback avatar */}
                  <div className="avatar-fallback" style={{ display: "none" }}>
                    RF
                  </div>
                  <div className="status-indicator" />
                </div>
                <div className="developer-details">
                  <h4 className="developer-name">Rulif Fadria Nirwansyah</h4>
                  <h4 className="Bachelor Degree">Universitas Sangga Buana Ypkp</h4>
                  <p className="developer-title">The Next Of Full-Stack Developer GenZ</p>
                  <div className="developer-motto">
                    <FaCode className="motto-icon" />
                    <span className="motto-text">Code with passion, learn with purpose!</span>
                    <FaStar className="motto-sparkle" />
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="social-links">
              <SocialLink
                href="https://www.linkedin.com/in/ruliffadrian/"
                icon={<FaLinkedin className="social-icon" />}
                label="LinkedIn"
                className="social-linkedin"
              />
              <SocialLink
                href="https://github.com/rulifcode"
                icon={<FaGithub className="social-icon" />}
                label="GitHub"
                className="social-github"
              />
              <SocialLink
                href="https://instagram.com/ruliffadrian?igsh=bTNjcmFmdXI1YW90"
                icon={<FaInstagram className="social-icon" />}
                label="Instagram"
                className="social-instagram"
              />
              <SocialLink
                href="mailto:ruliffax@gmail.com"
                icon={<FaEnvelope className="social-icon" />}
                label="Email"
                className="social-email"
              />
            </div>
          </div>

          {/* Product Links */}
          <div className="footer-section">
            <h3 className="section-title">Product</h3>
            <ul className="section-links">
              <FooterLink to="/features">Features</FooterLink>
              <FooterLink to="/how-it-works">How it Works</FooterLink>
              <FooterLink to="/examples">Examples</FooterLink>
              <FooterLink to="/pricing">Pricing</FooterLink>
            </ul>
          </div>

          {/* Support Links */}
          <div className="footer-section">
            <h3 className="section-title">Support</h3>
            <ul className="section-links">
              <FooterLink to="/help">Help Center</FooterLink>
              <FooterLink to="/contact">Contact Us</FooterLink>
              <FooterLink to="/privacy">Privacy Policy</FooterLink>
              <FooterLink to="/terms">Terms of Service</FooterLink>
            </ul>
          </div>
        </div>

        {/* Motivational Quote Section */}
        <div className="quote-section">
          <div className="quote-container">
            <div className="quote-card">
              <div className="quote-header">
                <FaStar className="quote-sparkle" />
                <span className="quote-badge">Innovation Through Code</span>
                <FaStar className="quote-sparkle" />
              </div>
              <blockquote className="quote-text">
                "Every line of code is a step towards innovation. Every bug is a lesson learned. Every project is a
                journey of growth."
              </blockquote>
              <p className="quote-subtitle">Building the future, one commit at a time 🚀</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="copyright">
              <span>© {currentYear} Made with</span>
              <FaHeart className="heart-icon" />
              <span>by</span>
              <a href="https://github.com/rulifcode" target="_blank" rel="noopener noreferrer" className="author-link">
                Rulif Fadria Nirwansyah
              </a>
            </div>

            <div className="status-indicators">
              <div className="status-item">
                <div className="status-dot status-green" />
                <span className="status-text status-operational">All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced floating particles effect */}
      <div className="particles-container">
        <div className="particle particle-1" />
        <div className="particle particle-2" />
        <div className="particle particle-3" />
        <div className="particle particle-4" />
        <div className="particle particle-5" />
      </div>
    </footer>
  )
}

function SocialLink({ href, icon, label, className }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`social-link ${className}`} aria-label={label}>
      <div className="social-icon-wrapper">{icon}</div>

      {/* Tooltip */}
      <div className="social-tooltip">{label}</div>

      {/* Hover glow effect */}
      <div className="social-glow" />
    </a>
  )
}

function FooterLink({ to, children }) {
  return (
    <li className="footer-link-item">
      <Link to={to} className="footer-link">
        {children}
        <span className="footer-link-underline" />
      </Link>
    </li>
  )
}
