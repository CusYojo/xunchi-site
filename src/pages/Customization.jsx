import React from 'react';
import { Link } from 'react-router-dom';
import './Customization.css';

const Customization = () => {
    const services = [
        {
            title: 'OEM/ODM Services',
            description: 'We offer comprehensive Original Equipment Manufacturing and Original Design Manufacturing services. Whether you have substantial specifications or need design assistance, we can bring your vision to life.',
            icon: '🏭'
        },
        {
            title: 'Color Matching',
            description: 'Provide us with pantone codes or physical swatches, and our lab will create precise lab dips for your approval before mass production begins.',
            icon: '🎨'
        },
        {
            title: 'Pattern Design',
            description: 'Our in-house design team follows the latest trends to generate new print and jacquard patterns. We can also digitize and produce your custom artwork.',
            icon: '🖌️'
        }
    ];

    return (
        <div className="customization-page">
            <div className="customization-hero">
                <div className="container">
                    <h1>Customization & Services</h1>
                    <p>Tailored textile solutions to meet your specific brand requirements.</p>
                </div>
            </div>

            <div className="container">
                <div className="section">
                    <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Our Core Services</h2>
                    <div className="services-grid">
                        {services.map((service, index) => (
                            <div key={index} className="service-card">
                                <div className="service-icon">{service.icon}</div>
                                <h3>{service.title}</h3>
                                <p>{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="section" style={{ background: '#f8fafc', padding: '3rem', borderRadius: '8px' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Customization Workflow</h2>
                    <div className="process-timeline">
                        <div className="timeline-item">
                            <h4>1. Consultation</h4>
                            <p>Discuss your requirements, including fabric type, weight, width, color, and finish.</p>
                        </div>
                        <div className="timeline-item">
                            <h4>2. Sampling / Lab Dips</h4>
                            <p>We create initial samples or lab dips for your approval to ensure the specifications are met.</p>
                        </div>
                        <div className="timeline-item">
                            <h4>3. Order Confirmation</h4>
                            <p>Once samples are approved, we proceed with the contract and deposit for mass production.</p>
                        </div>
                        <div className="timeline-item">
                            <h4>4. Production & QC</h4>
                            <p>Mass production begins with constant quality monitoring throughout the process.</p>
                        </div>
                        <div className="timeline-item">
                            <h4>5. Delivery</h4>
                            <p>Finished goods are packaged and shipped to your designated location.</p>
                        </div>
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '2rem' }}>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Customization;
