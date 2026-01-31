import { motion } from 'framer-motion';
import { ArrowRight, Star, ShieldCheck, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import catalogCover from '../assets/catalog-cover.png';
import companyIntro from '../assets/company-intro.png';
import productPreview from '../assets/products-preview.png';

const Home = () => {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src={catalogCover}
                        alt="Xunchi Textile Collection"
                        className="w-full h-full object-cover opacity-90 transition-transform duration-10000 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-stone-900/80 via-stone-900/40 to-transparent" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-2xl"
                    >
                        <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
                            Trusted Profession, <br />
                            <span className="text-amber-200">Superior Quality</span>
                        </h1>
                        <p className="text-lg md:text-xl text-stone-200 mb-8 leading-relaxed max-w-lg">
                            Specializing in premium home textiles since 2010.
                            We bring comfort and elegance to homes worldwide with our OEKO-TEX certified fabrics.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                to="/products"
                                className="inline-flex items-center justify-center bg-white text-stone-900 px-8 py-4 rounded-full font-medium hover:bg-stone-100 transition-colors shadow-lg"
                            >
                                Explore Collection <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                            <Link
                                to="/contact"
                                className="inline-flex items-center justify-center bg-transparent border border-white/30 text-white px-8 py-4 rounded-full font-medium hover:bg-white/10 transition-colors backdrop-blur-sm"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Intro Section */}
            <section className="py-24 bg-stone-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-6">Shaoxing Xunchi Textiles Co., LTD</h2>
                            <div className="h-1 w-20 bg-amber-800 mb-8" />
                            <p className="text-stone-600 mb-6 leading-relaxed">
                                Founded in 2010, Shaoxing Xunchi Textiles is a premier home textiles manufacturer specializing in various knit fabrics, including Fleece, Coral Fleece, Flannel, and double-sided blankets.
                            </p>
                            <p className="text-stone-600 mb-8 leading-relaxed">
                                Our factory is OEKO-TEX Standard 100 certified and BSCI audited. Located near Ningbo and Shanghai ports, we ensure efficient global logistics. With over 14 years of development, we have established our own fabric weaving, dyeing, and ready-made workshops.
                            </p>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-amber-100 rounded-lg text-amber-900 mt-1">
                                        <ShieldCheck size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-stone-900">Certified Quality</h4>
                                        <p className="text-sm text-stone-500">OEKO-TEX & BSCI Verified</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-amber-100 rounded-lg text-amber-900 mt-1">
                                        <Globe size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-stone-900">Global Reach</h4>
                                        <p className="text-sm text-stone-500">Exporting Worldwide</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="absolute -inset-4 bg-amber-900/5 rounded-2xl -z-10 rotate-3"></div>
                            <img
                                src={companyIntro}
                                alt="Factory and Office"
                                className="rounded-xl shadow-2xl w-full"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Featured Products Preview */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">Our Featured Collections</h2>
                        <p className="text-stone-500">
                            Discover our extensive range of high-quality blankets and home textiles, designed for comfort and style.
                        </p>
                    </div>

                    <div className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-xl">
                        <img src={productPreview} alt="Products Preview" className="w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                            <Link to="/products" className="bg-white/90 backdrop-blur text-stone-900 px-8 py-3 rounded-full font-medium transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                View Full Catalog
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
