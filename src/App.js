import React from 'react';
import './App.css';

import NavBar from './components/commonComponents/NavBar';
import Sidebar from './components/commonComponents/SideBar';
import Footer from './components/commonComponents/Footer';
import Home from './components/commonComponents/Home';
import Login from './components/Login';
import PlantCategory from './components/PlantCategory';
import DisplayProduct from './components/DisplayProducts';
import Cart from './components/CartComponents/Cart';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Contact from './components/AdditionalComponents/ContactUs';
import Checkout from './components/CartComponents/Checkout';
import ThankYouComponent from './components/CartComponents/ThankYouComponent';
import Feedback from './components/AdditionalComponents/Feedback';
import AboutUs from './components/AdditionalComponents/AboutUs';

export const AuthProvider = React.createContext();

function App() {
  return (
    <div className="grid-container">
      <NavBar />
      <Sidebar />
      <div className="item3">
        <BrowserRouter>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/category/:category" element={<PlantCategory />} />
            <Route path="/displayProduct" element={<DisplayProduct />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/thankYou' element={<ThankYouComponent />} />

            <Route path="*" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </div>
      <Footer />
    </div>
  );
}

export default App;
