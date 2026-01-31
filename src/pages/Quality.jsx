import React from 'react';
import './Quality.css';

const Quality = () => {
    return (
        <div className="quality-page">
            <div className="quality-hero">
                <div className="container">
                    <h1>Quality Control</h1>
                    <p>At Shaoxing Xunchi Textile, quality is our top priority. We implement rigorous testing and inspection protocols at every stage of production.</p>
                </div>
            </div>

            <div className="container">
                <div className="qc-process-section">
                    <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Our 4-Step QC Process</h2>

                    <div className="qc-step">
                        <div className="qc-step-number">01</div>
                        <div className="qc-step-content">
                            <h3>Raw Material Inspection</h3>
                            <p>Before production begins, we verify the quality of all yarns and raw materials. We check for strength, color consistency, and defects to ensure a flawless foundation for our fabrics.</p>
                        </div>
                    </div>

                    <div className="qc-step">
                        <div className="qc-step-number">02</div>
                        <div className="qc-step-content">
                            <h3>In-Process Monitoring</h3>
                            <p>During knitting or weaving, our technicians constantly monitor the machinery and fabric output. Immediate adjustments are made to maintain correct tension, density, and width.</p>
                        </div>
                    </div>

                    <div className="qc-step">
                        <div className="qc-step-number">03</div>
                        <div className="qc-step-content">
                            <h3>Finished Fabric Testing</h3>
                            <p>We conduct comprehensive tests on finished fabrics, including color fastness (wash, light, rub), shrinkage, piling resistance, and tear strength, ensuring they meet international standards.</p>
                        </div>
                    </div>

                    <div className="qc-step">
                        <div className="qc-step-number">04</div>
                        <div className="qc-step-content">
                            <h3>Final Inspection & Packaging</h3>
                            <p>Every roll is inspected on a light table for visual defects. Only approved rolls are packaged with protective wrapping, clear labeling, and shipment documentation.</p>
                        </div>
                    </div>
                </div>

                <div className="section">
                    <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Our Standards</h2>
                    <div className="standards-grid">
                        <div className="standard-card">
                            <h4>ISO 9001</h4>
                            <p>We strictly adhere to ISO 9001 quality management systems to ensure consistent product delivery and customer satisfaction.</p>
                        </div>
                        <div className="standard-card">
                            <h4>Oeko-Tex Standard 100</h4>
                            <p>Our fabrics are certified free from harmful substances, making them safe for human use and environmentally friendly.</p>
                        </div>
                        <div className="standard-card">
                            <h4>AATCC & ISO Testing</h4>
                            <p>We use globally recognized testing methods (AATCC for US market, ISO for Europe/Asia) to verify performance specifications.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Quality;
