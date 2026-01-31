import { motion } from 'framer-motion';

const Products = () => {
    return (
        <div className="pt-24 pb-16 bg-stone-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-serif font-bold text-stone-900 mb-8 border-b pb-4 border-stone-200">Our Products</h1>
                <p className="text-xl text-stone-600 mb-12">
                    We offer a wide range of premium textiles including Double Ply Blankets, Flannel, Sherpa, and more.
                    <br /><span className="text-sm text-stone-400">(Detailed product catalog implementation in progress)</span>
                </p>

                {/* Placeholder Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <motion.div
                            key={item}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: item * 0.1 }}
                            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="aspect-[4/3] bg-stone-200 animate-pulse" />
                            <div className="p-6">
                                <div className="h-4 bg-stone-200 rounded w-3/4 mb-3" />
                                <div className="h-3 bg-stone-100 rounded w-1/2" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Products;
