import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-stone-900 text-stone-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="text-2xl font-serif font-bold text-white tracking-wider block mb-4">
                            XUN CHI
                        </Link>
                        <p className="text-sm text-stone-400 leading-relaxed">
                            Professional manufacturer of high-quality knit fabrics and home textiles. Trusted by global partners for over 15 years.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-6">Explore</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                            <li><Link to="/products" className="hover:text-white transition-colors">Our Products</Link></li>
                            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Products */}
                    <div>
                        <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-6">Products</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="/products?cat=flannel" className="hover:text-white transition-colors">Flannel Blanket</Link></li>
                            <li><Link to="/products?cat=coral" className="hover:text-white transition-colors">Coral Fleece</Link></li>
                            <li><Link to="/products?cat=picnic" className="hover:text-white transition-colors">Picnic Mats</Link></li>
                            <li><Link to="/products?cat=cushions" className="hover:text-white transition-colors">Cushions</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-6">Contact</h3>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-3">
                                <MapPin size={18} className="text-stone-500 mt-0.5" />
                                <span>
                                    Room 704, Huaxin Building,<br />
                                    Paojiang, Shaoxing City,<br />
                                    Zhejiang Province, China
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={18} className="text-stone-500" />
                                <span>+86 0575-88172981</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={18} className="text-stone-500" />
                                <span>xunwhj@zjxcfzp.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-stone-800 mt-16 pt-8 text-center text-xs text-stone-500">
                    <p>© {new Date().getFullYear()} Shaoxing Xunchi Textiles Co., LTD. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
