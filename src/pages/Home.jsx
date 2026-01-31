import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Globe, Layers, Clock, Award } from 'lucide-react';
import './Home.css';

const Home = () => {
    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content container">
                    <h1>Premium Textile Manufacturer for Global Markets</h1>
                    <p>Specializing in high-quality fabrics for Europe, USA, Japan & Korea. OEM/ODM services available.</p>
                    <div className="hero-buttons">
                        <Link to="/products" className="btn btn-primary">View Products</Link>
                        <Link to="/contact" className="btn btn-outline white-outline">Contact Us</Link>
                    </div>
                </div>
                <div className="hero-overlay"></div>
            </section>

            {/* USP Section */}
            <section className="section usp-section">
                <div className="container">
                    <div className="usp-grid">
                        <div className="usp-item">
                            <Award size={40} className="usp-icon" />
                            <h3>Professional Manufacturer</h3>
                            <p>Years of experience in textile production in Shaoxing.</p>
                        </div>
                        <div className="usp-item">
                            <Layers size={40} className="usp-icon" />
                            <h3>Strong OEM/ODM</h3>
                            <p>Customized solutions for brands and wholesalers.</p>
                        </div>
                        <div className="usp-item">
                            <CheckCircle size={40} className="usp-icon" />
                            <h3>Strict Quality Control</h3>
                            <p>100% inspection to ensure stable quality.</p>
                        </div>
                        <div className="usp-item">
                            <Globe size={40} className="usp-icon" />
                            <h3>Global Export</h3>
                            <p>Trusted by clients in Europe, USA, Japan & Korea.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Product Categories */}
            <section className="section products-section">
                <div className="container">
                    <div className="section-header">
                        <h2>Our Main Products</h2>
                        <p>Explore our wide range of high-quality fabrics</p>
                    </div>
                    <div className="category-grid">
                        <Link to="/products/knitted" className="category-card">
                            <div className="category-img placeholder-img">Knitted Fabrics</div>
                            <div className="category-info">
                                <h3>Knitted Fabrics</h3>
                                <span>View More <ArrowRight size={16} /></span>
                            </div>
                        </Link>
                        <Link to="/products/woven" className="category-card">
                            <div className="category-img placeholder-img">Woven Fabrics</div>
                            <div className="category-info">
                                <h3>Woven Fabrics</h3>
                                <span>View More <ArrowRight size={16} /></span>
                            </div>
                        </Link>
                        <Link to="/products/fashion" className="category-card">
                            <div className="category-img placeholder-img">Fashion & Apparel</div>
                            <div className="category-info">
                                <h3>Fashion & Apparel</h3>
                                <span>View More <ArrowRight size={16} /></span>
                            </div>
                        </Link>
                        <Link to="/products/home" className="category-card">
                            <div className="category-img placeholder-img">Home Textiles</div>
                            <div className="category-info">
                                <h3>Home Textiles</h3>
                                <span>View More <ArrowRight size={16} /></span>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Company Intro */}
            <section className="section about-section">
                <div className="container about-grid">
                    <div className="about-content">
                        <h2>About Xunchi Textile</h2>
                        <p>
                            Shaoxing Xunchi Textile Co., Ltd. is a professional textile manufacturer located in Shaoxing, China.
                            We specialize in producing high-quality fabrics and textile products for global markets.
                        </p>
                        <p>
                            With years of manufacturing experience, advanced equipment and strict quality control,
                            we provide reliable OEM/ODM services for brands, wholesalers and importers worldwide.
                        </p>
                        <Link to="/about" className="btn btn-primary">Learn More About Us</Link>
                    </div>
                    <div className="about-stats">
                        <div className="stat-item">
                            <span className="stat-number">10+</span>
                            <span className="stat-label">Years Experience</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">5000+</span>
                            <span className="stat-label">Factory Area (㎡)</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">40+</span>
                            <span className="stat-label">Export Countries</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">100+</span>
                            <span className="stat-label">Advanced Machines</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Inquiry */}
            <section className="section inquiry-section">
                <div className="container">
                    <div className="inquiry-wrapper">
                        <div className="inquiry-text">
                            <h2>Ready to Start?</h2>
                            <p>Send us your requirements and get a quick quote within 24 hours.</p>
                        </div>
                        <form className="quick-form" onSubmit={(e) => e.preventDefault()}>
                            <input type="text" placeholder="Your Name" required />
                            <input type="email" placeholder="Email Address" required />
                            <textarea placeholder="Message / Product Requirements" rows="3" required></textarea>
                            <button type="submit" className="btn btn-secondary">Send Inquiry</button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
