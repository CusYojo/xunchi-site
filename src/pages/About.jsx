import React from 'react';
import { Award, Globe, CheckCircle, Calendar } from 'lucide-react';
import companyProfileImg from '../assets/images/company-profile.png';
import './About.css';

const About = () => {
    return (
        <div className="about-page">
            {/* Hero Section */}
            <section className="about-hero">
                <div className="container">
                    <h1>About Xunchi Textile</h1>
                    <p>Trusted Profession, Superior Quality</p>
                </div>
            </section>

            {/* Main Content */}
            <section className="section container">
                <div className="about-intro">
                    <div className="intro-text">
                        <h2>Shaoxing Xunchi Textiles Co., Ltd.</h2>
                        <p className="lead">
                            Shaoxing Xunchi Textiles Co., Ltd. is a home textiles manufacturer which founded in 2010,
                            and specialized in various knit fabric, various blankets (such as fleece blanket, polar fleece blanket,
                            coral fleece blanket, flannel blanket, picnic blanket, double sided blanket and so on), cushions,
                            bedding and other home textile products.
                        </p>
                        <p>
                            Also, our products have <strong>OEKO-TEX Standard 100</strong>. The factory located in Shaoxing City,
                            Zhejiang Province, China, Which near Ningbo Port and Shanghai Port.
                        </p>
                        <p>
                            All of our products comply with international quality standards and are greatly appreciated in
                            variety of different markets throughout the world. Our factory is audited by <strong>BSCI</strong> factory audited.
                        </p>
                        <p>
                            With more than 14 years of development, we have our own fabric weaving workshop, dying workshop
                            and ready-made workshop. Warmly welcome you audit our factory.
                        </p>
                    </div>
                    <div className="intro-image">
                        <img src={companyProfileImg} alt="Xunchi Textile Factory" />
                    </div>
                </div>
            </section>

            {/* Key Features */}
            <section className="section features-section">
                <div className="container">
                    <div className="features-grid">
                        <div className="feature-item">
                            <Calendar size={40} className="feature-icon" />
                            <h3>Founded in 2010</h3>
                            <p>Over a decade of experience in textile manufacturing.</p>
                        </div>
                        <div className="feature-item">
                            <Award size={40} className="feature-icon" />
                            <h3>Certified Quality</h3>
                            <p>OEKO-TEX Standard 100 & BSCI Audited Factory.</p>
                        </div>
                        <div className="feature-item">
                            <Globe size={40} className="feature-icon" />
                            <h3>Global Reach</h3>
                            <p>Exporting to Europe, USA, Japan, and Korea.</p>
                        </div>
                        <div className="feature-item">
                            <CheckCircle size={40} className="feature-icon" />
                            <h3>Full Production Line</h3>
                            <p>Weaving, Dyeing, and Ready-made workshops.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
