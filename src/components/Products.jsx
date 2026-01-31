import React from 'react';
import './Products.css';
import productCatalog from '../assets/brochure-products.png';

const Products = () => {
    return (
        <section id="products" className="products-section">
            <div className="container">
                <h2 className="section-title">Our Products</h2>
                <p className="products-intro">
                    We offer a wide range of high-quality blankets including Double Ply, Fleece, Coral, Flannel, and more.
                    Explore our latest collection below.
                </p>

                <div className="products-catalog-view">
                    <img src={productCatalog} alt="Xunchi Textile Product Catalog" />
                </div>

                <div className="products-cta">
                    <button className="btn-primary">Download Full Catalog</button>
                </div>
            </div>
        </section>
    );
};

export default Products;
