import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Placeholder for form submission logic
        alert('Thank you for your message! We will get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <div className="contact-page">
            <div className="contact-hero">
                <div className="container">
                    <h1>Contact Us</h1>
                    <p>Get in touch with our team for inquiries, partnerships, or support.</p>
                </div>
            </div>

            <div className="container contact-content">
                <div className="contact-info-card">
                    <div className="contact-info-item">
                        <h3>Address</h3>
                        <p>
                            Shaoxing Xunchi Textile Co., Ltd.<br />
                            China Textile City, Keqiao District,<br />
                            Shaoxing City, Zhejiang Province, China
                        </p>
                    </div>
                    <div className="contact-info-item">
                        <h3>Phone & WhatsApp</h3>
                        <p>+86 135 1234 5678</p>
                    </div>
                    <div className="contact-info-item">
                        <h3>Email</h3>
                        <p>info@shaoxingxunchi.com</p>
                        <p>sales@shaoxingxunchi.com</p>
                    </div>
                    <div className="contact-info-item">
                        <h3>Business Hours</h3>
                        <p>Monday - Friday: 9:00 AM - 6:00 PM (GMT+8)</p>
                        <p>Saturday: 9:00 AM - 12:00 PM</p>
                    </div>
                </div>

                <div className="contact-form-section">
                    <h2>Send us a Message</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Your Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="form-control"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-control"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="subject">Subject</label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                className="form-control"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                className="form-control"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
