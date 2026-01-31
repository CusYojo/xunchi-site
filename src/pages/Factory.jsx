import React from 'react';
import factoryWorkshopImg from '../assets/images/factory-workshop.png';
import './Factory.css';

const Factory = () => {
    const workshops = [
        {
            id: 1,
            title: "Weaving Workshop",
            desc: "Advanced weaving machines ensuring high-quality fabric production.",
            image: "https://placehold.co/600x400/e2e8f0/64748b?text=Weaving+Workshop"
        },
        {
            id: 2,
            title: "Dyeing Workshop",
            desc: "Eco-friendly dyeing process with precise color matching.",
            image: "https://placehold.co/600x400/e2e8f0/64748b?text=Dyeing+Workshop"
        },
        {
            id: 3,
            title: "Cutting & Sewing",
            desc: "Skilled workers and automated cutting for accurate dimensions.",
            image: "https://placehold.co/600x400/e2e8f0/64748b?text=Sewing+Workshop"
        },
        {
            id: 4,
            title: "Inspection & Packaging",
            desc: "Strict quality control and professional packaging (compressing available).",
            image: "https://placehold.co/600x400/e2e8f0/64748b?text=Packaging"
        },
        {
            id: 5,
            title: "Finished Product Warehouse",
            desc: "Large capacity warehouse for organized storage and logistics.",
            image: "https://placehold.co/600x400/e2e8f0/64748b?text=Warehouse"
        },
        {
            id: 6,
            title: "Sample Room",
            desc: "Showcasing our latest designs and fabric collections.",
            image: "https://placehold.co/600x400/e2e8f0/64748b?text=Sample+Room"
        }
    ];

    return (
        <div className="factory-page">
            <div className="page-header">
                <div className="container">
                    <h1>Factory Tour</h1>
                    <p>See where our high-quality textiles are made.</p>
                </div>
            </div>

            <div className="container section">
                {/* Factory Overview Image */}
                <div className="factory-overview">
                    <h2>Workshop Overview</h2>
                    <img src={factoryWorkshopImg} alt="Factory Workshops Overview" className="overview-img" />
                </div>

                <div className="factory-grid">
                    {workshops.map(item => (
                        <div key={item.id} className="factory-card">
                            <div className="factory-img">
                                <img src={item.image} alt={item.title} />
                            </div>
                            <div className="factory-info">
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Factory;
