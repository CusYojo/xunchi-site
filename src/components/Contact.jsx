import React from 'react';
import './Contact.css';

const Contact = () => {
    return (
        <section id="contact" className="contact-section">
            <div className="container">
                <h2 className="section-title">Contact Us</h2>
                <div className="contact-grid">
                    <div className="contact-info">
                        <div className="contact-item">
                            <h3>Office Address</h3>
                            <p>Room 704, Huaxin Building, Paojiang, Shaoxing City, Zhejiang Province, China.</p>
                        </div>
                        <div className="contact-item">
                            <h3>Factory Address</h3>
                            <p>No.8 Sanjiang East Road, Paojiang, Shaoxing City, Zhejiang Province, China.</p>
                        </div>
                        <div className="contact-item">
                            <h3>Get in Touch</h3>
                            <p><strong>Tel:</strong> 0575-88172981</p>
                            <p><strong>Mob:</strong> 138-5755-2808 / 137-5758-2883</p>
                            <p><strong>Fax:</strong> 0575-88172981</p>
                            <p><strong>Email:</strong> xunwhj@zjxcfzp.com / Xunwzy@zjxcfzp.com</p>
                            <p><strong>Web:</strong> http://www.jzxcfz.com</p>
                        </div>
                    </div>

                    <div className="contact-form-wrapper">
                        <h3>Send us a Message</h3>
                        <form className="contact-form">
                            <div className="form-group">
                                <input type="text" placeholder="Your Name" required />
                            </div>
                            <div className="form-group">
                                <input type="email" placeholder="Your Email" required />
                            </div>
                            <div className="form-group">
                                <textarea placeholder="Your Message" rows="5" required></textarea>
                            </div>
                            <button type="submit" className="btn-primary">Send Message</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
