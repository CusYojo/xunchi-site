import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Contact from './pages/Contact';

// Skeleton components for pages not yet implemented
const ProductsSkeleton = () => <div className="pt-32 pb-20 px-8 text-center text-stone-500 text-xl min-h-[60vh]">Products Page Coming Soon...</div>;
const AboutSkeleton = () => <div className="pt-32 pb-20 px-8 text-center text-stone-500 text-xl min-h-[60vh]">About Us Page Coming Soon...</div>;
const ContactSkeleton = () => <div className="pt-32 pb-20 px-8 text-center text-stone-500 text-xl min-h-[60vh]">Contact Page Coming Soon...</div>;

function App() {
  return (
    <div className="min-h-screen bg-white text-stone-900 font-sans selection:bg-amber-100 selection:text-amber-900">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {/* Fallback for development */}
          <Route path="*" element={<div className="pt-32 text-center">404 Not Found</div>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
