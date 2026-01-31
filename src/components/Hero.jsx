import React from 'react';
import './Hero.css';
import heroBg from '../assets/brochure-cover.png'; // Using the cover as background or part of it

const Hero = () => {
    return (
        <section id="hero" className="hero" style={{ backgroundImage: `url(${heroBg})` }}>
            <div className="hero-overlay"></div>
            <div className="container hero-content">
                <h2 className="hero-subtitle">Trusted Profession · Superior Quality</h2>
                <h1 className="hero-title">Shaoxing Xunchi Textile</h1>
                <p className="hero-description">Specialized in various knit fabrics, fleece, and blankets since 2010.</p>
                <a href="#products" className="btn-primary">View Products</a>
            </div>
        </section>
    );
};

export default Hero;
