import React, { useState } from 'react';
import './RFQ.css';
import productsData from '../data/products.json';

const RFQ = () => {
    // If arriving from a product page, we might want to pre-select it.
    // Ideally this could be handled with query params or location state.

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        companyName: '',
        email: '',
        phone: '',
        country: '',
        productInterest: '',
        quantity: '',
        specifications: '',
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
        alert('Your quote request has been sent! We will respond within 24 hours.');
        // Reset form
        setFormData({
            firstName: '',
            lastName: '',
            companyName: '',
            email: '',
            phone: '',
            country: '',
            productInterest: '',
            quantity: '',
            specifications: '',
            message: ''
        });
    };

    return (
        <div className="rfq-page">
            <div className="rfq-hero">
                <div className="container">
                    <h1>Request a Quote</h1>
                    <p>Tell us about your requirements, and we'll provide a custom price quote tailored to your needs.</p>
                </div>
            </div>

            <div className="container">
                <div className="rfq-form-container">
                    <form onSubmit={handleSubmit}>
                        <div className="form-section">
                            <h3>Contact Information</h3>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="firstName">First Name *</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        className="form-control"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastName">Last Name *</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        className="form-control"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="companyName">Company Name</label>
                                    <input
                                        type="text"
                                        id="companyName"
                                        name="companyName"
                                        className="form-control"
                                        value={formData.companyName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="country">Country / Region *</label>
                                    <input
                                        type="text"
                                        id="country"
                                        name="country"
                                        className="form-control"
                                        value={formData.country}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="email">Email Address *</label>
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
                                    <label htmlFor="phone">Phone Number</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        className="form-control"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-section">
                            <h3>Product Details</h3>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="productInterest">Product of Interest *</label>
                                    <select
                                        id="productInterest"
                                        name="productInterest"
                                        className="form-control"
                                        value={formData.productInterest}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select a product...</option>
                                        <option value="General Inquiry">General Inquiry</option>
                                        {productsData.map(product => (
                                            <option key={product.id} value={product.name}>
                                                {product.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="quantity">Estimated Quantity (Meters/Yards)</label>
                                    <input
                                        type="text"
                                        id="quantity"
                                        name="quantity"
                                        className="form-control"
                                        value={formData.quantity}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="specifications">Specific Requirements (GSM, Width, Color, etc.)</label>
                                <textarea
                                    id="specifications"
                                    name="specifications"
                                    className="form-control"
                                    value={formData.specifications}
                                    onChange={handleChange}
                                    rows="3"
                                ></textarea>
                            </div>
                        </div>

                        <div className="form-section">
                            <h3>Additional Message</h3>
                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    className="form-control"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="4"
                                    placeholder="Tell us more about your project or specific needs..."
                                ></textarea>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary" style={{ width: '100%', fontSize: '1.1rem' }}>
                            Submit Request
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RFQ;
