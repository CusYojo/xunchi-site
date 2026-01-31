import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import Factory from './pages/Factory';
import Products from './pages/Products';
import PlaceholderPage from './pages/PlaceholderPage';

import Contact from './pages/Contact';
import Quality from './pages/Quality';
import Customization from './pages/Customization';
import News from './pages/News';
import RFQ from './pages/RFQ';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:category" element={<Products />} />
          <Route path="customization" element={<Customization />} />
          <Route path="quality" element={<Quality />} />
          <Route path="factory" element={<Factory />} />
          <Route path="news" element={<News />} />
          <Route path="contact" element={<Contact />} />
          <Route path="rfq" element={<RFQ />} />
          <Route path="*" element={<PlaceholderPage title="404 - Page Not Found" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
