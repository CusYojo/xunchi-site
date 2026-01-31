import React from 'react';
import './News.css';

const News = () => {
    const newsItems = [
        {
            id: 1,
            title: 'Shaoxing Xunchi Textile Attends 2024 Intertextile Shanghai',
            date: 'October 15, 2024',
            excerpt: 'We are proud to announce our successful participation in the 2024 Intertextile Shanghai Apparel Fabrics Autumn Edition. It was a great opportunity to showcase our latest knitted and woven collections...',
            image: null // Placeholder
        },
        {
            id: 2,
            title: 'New Eco-Friendly Fabric Line Launched',
            date: 'September 1, 2024',
            excerpt: 'In response to growing global demand for sustainable textiles, we have officially launched our new "Green Future" series, featuring recycled polyester and organic cotton blends...',
            image: null
        },
        {
            id: 3,
            title: 'Expansion of Factory Production Capacity',
            date: 'August 10, 2024',
            excerpt: 'To meet increasing order volumes, we have recently installed 20 stunning new circular knitting machines, increasing our daily output capacity by 15%...',
            image: null
        },
        {
            id: 4,
            title: 'Understanding Fabric GSM and Its Importance',
            date: 'July 22, 2024',
            excerpt: 'GSM (Grams per Square Meter) is a crucial metric in textile specification. In this guide, we explain how GSM impacts the drape, weight, and usage of different fabrics...',
            image: null
        }
    ];

    return (
        <div className="news-page">
            <div className="news-hero">
                <div className="container">
                    <h1>News & Insights</h1>
                    <p>Stay updated with our latest company news, industry trends, and product launches.</p>
                </div>
            </div>

            <div className="container">
                <div className="news-grid">
                    {newsItems.map(item => (
                        <article key={item.id} className="news-card">
                            <div className="news-image">
                                {item.image ? (
                                    <img src={item.image} alt={item.title} />
                                ) : (
                                    <span>No Image Available</span>
                                )}
                            </div>
                            <div className="news-content">
                                <span className="news-date">{item.date}</span>
                                <h3 className="news-title">{item.title}</h3>
                                <p className="news-excerpt">{item.excerpt}</p>
                                <a href="#" className="read-more" onClick={(e) => e.preventDefault()}>
                                    Read Full Article &rarr;
                                </a>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default News;
