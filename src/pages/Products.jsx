import React from 'react';
import { useParams, Link } from 'react-router-dom';
import productsData from '../data/products.json';
import './Products.css';

const Products = () => {
    const { category } = useParams();
    const activeCategory = category || 'all';

    const filteredProducts = activeCategory === 'all'
        ? productsData
        : productsData.filter(p => p.category === activeCategory);

    const categories = [
        { id: 'all', name: 'All Products' },
        { id: 'knitted', name: 'Knitted Fabrics' },
        { id: 'woven', name: 'Woven Fabrics' },
        { id: 'fashion', name: 'Fashion & Apparel' },
        { id: 'home', name: 'Home Textiles' },
        { id: 'functional', name: 'Functional Fabrics' },
    ];

    return (
        <div className="products-page">
            <div className="page-header">
                <div className="container">
                    <h1>Our Products</h1>
                    <p>Explore our comprehensive collection of high-quality textiles.</p>
                </div>
            </div>

            <div className="container products-layout">
                {/* Sidebar Filters */}
                <aside className="products-sidebar">
                    <h3>Categories</h3>
                    <ul>
                        {categories.map(cat => (
                            <li key={cat.id}>
                                <Link
                                    to={cat.id === 'all' ? '/products' : `/products/${cat.id}`}
                                    className={activeCategory === cat.id ? 'active' : ''}
                                    style={{
                                        display: 'block',
                                        padding: '0.75rem 0',
                                        color: activeCategory === cat.id ? 'var(--color-secondary)' : 'var(--color-text-main)',
                                        fontWeight: activeCategory === cat.id ? '600' : '400',
                                        borderBottom: '1px solid var(--color-border)'
                                    }}
                                >
                                    {cat.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </aside>

                {/* Product Grid */}
                <div className="products-grid-wrapper">
                    {filteredProducts.length > 0 ? (
                        <div className="products-grid">
                            {filteredProducts.map(product => (
                                <div key={product.id} className="product-card">
                                    <div className="product-img">
                                        <img src={product.image} alt={product.name} />
                                    </div>
                                    <div className="product-details">
                                        <h3>{product.name}</h3>
                                        <p className="product-desc">{product.description}</p>
                                        <div className="product-specs">
                                            <span><strong>GSM:</strong> {product.gsm}</span>
                                            <span><strong>Width:</strong> {product.width}</span>
                                        </div>
                                        <Link to="/rfq" className="btn btn-outline btn-sm">Inquire Now</Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="no-products">
                            <p>No products found in this category.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Products;
