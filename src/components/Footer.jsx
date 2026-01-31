import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Linkedin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-content">
                <div className="footer-section">
                    <h3 className="footer-logo">XUNCHI TEXTILE</h3>
                    <p className="footer-desc">
                        Professional textile manufacturer in Shaoxing, specializing in high-quality fabrics for global markets.
                    </p>
                    <div className="social-links">
                        <a href="#" className="social-link"><Facebook size={20} /></a>
                        <a href="#" className="social-link"><Linkedin size={20} /></a>
                    </div>
                </div>

                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul className="footer-links">
                        <li><Link to="/products">Products</Link></li>
                        <li><Link to="/factory">Factory Tour</Link></li>
                        <li><Link to="/quality">Quality Control</Link></li>
                        <li><Link to="/contact">Contact Us</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Products</h4>
                    <ul className="footer-links">
                        <li><Link to="/products/knitted">Knitted Fabrics</Link></li>
                        <li><Link to="/products/woven">Woven Fabrics</Link></li>
                        <li><Link to="/products/fashion">Fashion Fabrics</Link></li>
                        <li><Link to="/products/home">Home Textiles</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Contact Us</h4>
                    <ul className="contact-list">
                        <li>
                            <MapPin size={18} />
                            <span>Room 704, Huaxin Building, Paojiang, Shaoxing City, Zhejiang, China</span>
                        </li>
                        <li>
                            <Phone size={18} />
                            <span>+86-575-88172991</span>
                        </li>
                        <li>
                            <Mail size={18} />
                            <span>info@xunchitextile.com</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="container">
                    <p>&copy; {new Date().getFullYear()} Shaoxing Xunchi Textile Co., Ltd. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
