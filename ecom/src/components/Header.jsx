import React, { useState } from 'react';
import { FaHeart, FaShoppingCart, FaUser, FaPhone, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import LoginModal from './LoginModal';

function Header({ user, onLogin, onLogout }) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleLogin = (userData) => {
    onLogin(userData);
    setIsLoginModalOpen(false);
  };

  const handleLogout = () => {
    onLogout();
  };

  return (
    <>
      <header className="header">
        <div className="header-top">
          <div className="contact-info">
            <FaPhone className="contact-icon" />
            <span>Emergency: +91 1800-123-4567</span>
          </div>
          <div className="header-actions">
            {user ? (
              <div className="user-menu">
                <button className="header-btn user-btn">
                  <FaUserCircle />
                  <span>{user.name}</span>
                </button>
                <button className="header-btn" onClick={handleLogout}>
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button className="header-btn" onClick={handleLoginClick}>
                <FaUser />
                <span>Login</span>
              </button>
            )}
            <button className="header-btn">
              <FaHeart />
              <span>Wishlist</span>
            </button>
          </div>
        </div>
        
        <div className="header-main">
          <div className="logo-section">
            <div className="logo">
              <div className="logo-icon">🩸</div>
            </div>
            <div className="brand-info">
              <h1 className="main-title">BloodBank Pro</h1>
              <p className="subtitle">Safe & Reliable Blood Supply Management</p>
            </div>
          </div>
          
          <div className="header-stats">
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Donors</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">1000+</div>
              <div className="stat-label">Lives Saved</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Support</div>
            </div>
          </div>
        </div>
      </header>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />
    </>
  );
}

export default Header; 