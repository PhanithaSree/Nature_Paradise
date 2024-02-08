import React from 'react';
import './App.css';
import Nav from '../src/components/commonComponents/nav';
import Sidebar from './components/commonComponents/sidebar';
import Footer from './components/commonComponents/footer';
import Home from './components/commonComponents/home';
import Login from './components/login';
import PlantCategory from './components/PlantCategory';
import DisplayProduct from './components/displayProduct';
import Cart from './components/CartComponents/Cart';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { IdContext } from './components/CartComponents/Cart';
// import { IdProvider } from './components/displayProduct'; // Import IdProvider

function App() {
  let id = "65c49ebb1d8645c2957c55d9";
  const p = "";
  const msg = "Hello";

  return (


    // <IdProvider> {/* Wrap the entire component tree with IdProvider */}
    <div className="grid-container">
      <Nav />
      <Sidebar />
      <div className="item3">
        <IdContext.Provider >
          <Router>
            <Routes>
              <Route path="/Home" element={<Home />} />
              <Route path="/Login" element={<Login />} />
              <Route path="*" element={<Home />} />
              <Route path="/category/:category" element={<PlantCategory />} />
              <Route path="/displayProduct" element={<DisplayProduct />} />

              <Route path="/Cart" element={<Cart />} />

            </Routes>
          </Router>
        </IdContext.Provider>

      </div>
      <Footer />
    </div>

  );
}

export default App;
