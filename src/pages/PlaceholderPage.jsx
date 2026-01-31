import React from 'react';

const PlaceholderPage = ({ title }) => {
    return (
        <div className="section container" style={{ textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <h1>{title}</h1>
            <p style={{ marginTop: '1rem', color: '#64748b' }}>This page is currently under construction.</p>
        </div>
    );
};

export default PlaceholderPage;
