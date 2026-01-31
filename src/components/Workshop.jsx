import React from 'react';
import './Workshop.css';
import workshopImg from '../assets/brochure-workshop.jpg';

const Workshop = () => {
    return (
        <section id="workshop" className="workshop-section">
            <div className="container">
                <h2 className="section-title">Workshop Profile</h2>
                <p className="workshop-intro">
                    We possess comprehensive production capabilities including Weaving, Dyeing, Cutting, Sewing, Parking, and Final Packing.
                </p>
                <div className="workshop-gallery">
                    {/* Using the full collage image for now as we don't have individual images extracted */}
                    <img src={workshopImg} alt="Workshop Overview" className="workshop-collage" />
                </div>
            </div>
        </section>
    );
};

export default Workshop;
