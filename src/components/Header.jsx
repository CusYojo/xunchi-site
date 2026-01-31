import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`header ${scrolled ? 'scrolled' : ''}`}>
            <div className="container header-container">
                <div className="logo">
                    {/* Using text for now as we extract logo later, or use image */}
                    <h1>CX <span className="sub-logo">Xunchi Textile</span></h1>
                </div>
                <nav className="nav">
                    <ul className="nav-list">
                        <li><a href="#hero">Home</a></li>
                        <li><a href="#about">About Us</a></li>
                        <li><a href="#workshop">Workshop</a></li>
                        <li><a href="#products">Products</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
