import React from 'react';
import './About.css';
import aboutImg from '../assets/brochure-about.png';

const About = () => {
    return (
        <section id="about" className="about-section">
            <div className="container">
                <h2 className="section-title">Company Introduction</h2>
                <div className="about-content">
                    <div className="about-text">
                        <h3>SHAOXING XUNCHI TEXTILES CO., LTD</h3>
                        <p>
                            Shaoxing Xunchi Textiles Co., Ltd is a home textiles manufacturer founded in 2010, specialized in various knit fabrics, various blankets (such as fleece blanket, polar fleece blanket, coral fleece blanket, flannel blanket, picnic blanket, double sided blanket and so on), cushions, bedding and other home textile products.
                        </p>
                        <p>
                            Also, our products have OEKO-TEX Standard 100 certification. The factory is located in Shaoxing City, Zhejiang Province, China, near Ningbo Port and Shanghai Port. All of our products comply with international quality standards and are greatly appreciated in a variety of different markets throughout the world.
                        </p>
                        <p>
                            Our factory is audited by BSCI factory audited. With more than 14 years of development, we have our own fabric weaving workshop, dyeing workshop and ready-made workshop. Warmly welcome you audit our factory.
                        </p>
                    </div>
                    <div className="about-image">
                        <img src={aboutImg} alt="Shaoxing Xunchi Textiles Factory Building" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
