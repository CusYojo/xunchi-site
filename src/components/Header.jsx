import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail } from 'lucide-react';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Customization', path: '/customization' },
    { name: 'Quality', path: '/quality' },
    { name: 'Factory', path: '/factory' },
    { name: 'News', path: '/news' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="header">
      {/* Top Bar */}
      <div className="top-bar">
        <div className="container top-bar-content">
          <div className="contact-info">
            <span className="contact-item">
              <Mail size={14} /> info@xunchitextile.com
            </span>
            <span className="contact-item">
              <Phone size={14} /> +86-575-XXXX-XXXX
            </span>
          </div>
          <div className="languages">
            <span>English</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="main-header">
        <div className="container header-content">
          <Link to="/" className="logo">
            XUNCHI TEXTILE
          </Link>

          {/* Desktop Nav */}
          <nav className="desktop-nav">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <Link to="/rfq" className="btn btn-primary rfq-btn">
              Request a Quote
            </Link>
            <button className="mobile-menu-btn" onClick={toggleMenu}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <nav className="mobile-nav">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="mobile-nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <Link
            to="/rfq"
            className="mobile-nav-link rfq-mobile"
            onClick={() => setIsMenuOpen(false)}
          >
            Request a Quote
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
